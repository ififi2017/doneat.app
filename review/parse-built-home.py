"""Parse generated HTML for source checks. This does not run a browser."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"type": "root", "children": []}
        self.stack = [self.root]

    def handle_starttag(self, name, attrs):
        node = {"type": "tag", "name": name, "attribs": dict((k, v or "") for k, v in attrs), "children": []}
        self.stack[-1]["children"].append(node)
        if name not in VOID:
            self.stack.append(node)

    def handle_endtag(self, name):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].get("name") == name:
                self.stack = self.stack[:i]
                break

    def handle_startendtag(self, name, attrs):
        self.handle_starttag(name, attrs)
        if name not in VOID:
            self.handle_endtag(name)

    def handle_data(self, data):
        self.stack[-1]["children"].append({"type": "text", "data": data})

repo = Path(sys.argv[1])
locales = json.loads((repo / "locales/hall.json").read_text())["locales"]
documents = []
for locale in locales:
    parser = DocumentParser()
    parser.feed((repo / "dist" / locale / "index.html").read_text())
    documents.append({"locale": locale, "document": parser.root})
print(json.dumps(documents, ensure_ascii=False))
