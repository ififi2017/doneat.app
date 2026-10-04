---
title: "Política de Privacidade — DoneAt"
description: "Como o DoneAt armazena dados localmente por padrão, oferece sincronização privada opcional do iCloud no iPhone e iPad, e lida com análises e serviços de terceiros."
heading: "Política de Privacidade"
intro: "Esta página explica como o DoneAt armazena e processa informações: o site oficial, o temporizador web e os apps no iPhone, iPad, Android, Mac e Windows."
updatedLabel: "Última atualização"
updated: "4 de outubro de 2026"
---

## Dados armazenados pelo DoneAt

As informações que você insere são armazenadas localmente por padrão: no armazenamento local do navegador no temporizador web, e nos dados do aplicativo no iPhone, iPad, Android, Mac e Windows. O DoneAt não fornece contas de produto nem envia essas informações para servidores do DoneAt.

No iPhone e iPad, você pode ativar a sincronização com o iCloud. Ela armazena seus horários, registros, salário, preferências de lembrete, aparência, idioma, perfil de vida e dados de Foco no seu banco de dados privado do iCloud sob sua Conta Apple. A autorização de notificações, proteção biométrica, configurações de Atividade em tempo real, o temporizador de trabalho atual e o estado de integração ficam em cada dispositivo. O temporizador web, o app Android, Mac e o app Windows permanecem locais e não fazem parte dessa sincronização.

A contagem regressiva, o progresso e a estimativa de ganhos são calculados no seu dispositivo a partir dessas informações.

Isso normalmente inclui:

- Horários de início e fim, dias úteis e configurações de pausa ou hora extra
- Valor do salário, período de pagamento e histórico salarial
- Registros de trabalho e correções, fases de carreira e marcos de vida ou datas que você escolhe inserir
- Títulos de tarefas de foco, planos, sessões e configurações de descanso
- Preferências de notificação e lembrete
- Idioma e aparência

## Sincronização opcional com o iCloud

A sincronização está desativada por padrão. Quando você a ativa no iPhone ou iPad, o serviço CloudKit da Apple armazena os dados descritos acima no banco de dados privado associado à sua Conta Apple. O DoneAt não recebe uma cópia em seus próprios servidores. Dispositivos usando a mesma Conta Apple podem recuperar e sincronizar esses dados; isso requer uma conta iCloud disponível e conexão de rede.

Ativar a sincronização requer o DoneAt Plus. A sincronização já ativada continua após o término de uma assinatura. Desativar a sincronização para a sincronização nesse dispositivo e mantém tanto sua cópia local atual quanto a cópia do iCloud existente. Desativá-la não exclui nenhuma das duas cópias.

## Android

O Android está em testes; disponibilidade e compras Plus dependem do lançamento no Google Play. Dados de trabalho e ajustes ficam por padrão no armazenamento privado do app, sem conta DoneAt nem análise de uso no app.

Backups do sistema e transferências de dispositivo podem incluir registros, salário, histórico profissional, perfil de vida, dados Focus e ajustes de uma configuração incompleta. Dependem do dispositivo, conta e ajustes do sistema; o DoneAt não recebe cópia no servidor. O timer ativo, registro de lembretes e comprovantes de compra são excluídos. Após restaurar, os lembretes são refeitos e as compras verificadas novamente. Não há sincronização automática com Google Drive ou iPhone. Exportações manuais são JSON legível, podem conter salário e criam cópias separadas no destino escolhido.

O Google Play processa compras e avaliações opcionais. O DoneAt não recebe dados de cartão nem sabe se você enviou uma avaliação. Comprovantes com produto e token ficam localmente fora do backup do sistema. Compras podem ser verificadas ao abrir ou voltar ao app, restaurar ou tentar confirmar novamente. Com verificação no servidor ativada, token, produto e identificador aleatório de solicitação são enviados por HTTPS a `api.doneat.app` na Cloudflare. O Google envia mudanças pelo Cloud Pub/Sub. O serviço consulta o estado e o vencimento exato no Google e retorna um comprovante assinado, sem receber dados de trabalho ou backups.

O banco guarda hash do token, produto, estado e vencimento do acesso, hora da verificação, indicador de compra de teste, hash do token substituto e revisão para verificar, restaurar e impedir o reúso de compras substituídas. IDs de notificações são deduplicados em uma janela de 30 dias; os antigos são removidos ao processar notificações posteriores. Tokens originais e respostas do Google são transitórios, sem armazenamento no banco ou logs do app. A limitação por IP é temporária; o DoneAt não guarda IPs ou seus hashes no banco. Google e Cloudflare processam o tráfego segundo suas políticas. Identificadores de compra não são usados para publicidade ou perfis de uso.

Lembretes são locais. A autenticação do dispositivo fornece só o resultado, sem biometria nem PIN. Backdrop (AndroidLiquidGlass) e Shapes desenham localmente sem enviar conteúdo ou identificadores aos autores; fontes e licenças em [Sobre](/pt/about#android).

Apague dados locais no app, limpando o armazenamento ou desinstalando. Exclua exportações e backups do sistema separadamente junto ao provedor. Para excluir um registro de compra do servidor, escreva para [hello@doneat.app](mailto:hello@doneat.app). A exclusão local não apaga automaticamente esse registro nem cancela assinatura; gerencie-a no Google Play. Exportação e exclusão continuam disponíveis sem Plus ativo.


## Exportações de backup

No iPhone e iPad, uma exportação de backup é criada apenas quando você escolhe Exportar. Um backup completo inclui seus registros, configurações sincronizadas, salário e histórico salarial, perfil de vida, e tarefas e sessões de foco. Você também pode exportar sem o perfil de vida; essa opção ainda inclui salário e histórico de carreira. A folha de compartilhamento do sistema permite que você escolha onde salvar ou compartilhar o arquivo.

A exportação é um arquivo JSON legível, não um arquivo protegido por senha. Escolha um local de armazenamento e destinatários apropriados para as informações que ele contém. Arquivos que você salva ou compartilha são cópias separadas; excluir dados no DoneAt não exclui esses arquivos.

## Compras do Plus

No iPhone e iPad, a Apple lida com assinaturas do Plus e compras vitalícias pela App Store. O DoneAt usa o StoreKit para verificar o status da compra e restaurar o acesso, e mantém um registro local do direito verificado e qualquer data de expiração. O DoneAt não recebe os dados do seu cartão de pagamento nem envia seu status de compra para um servidor de contas do DoneAt. A Apple processa informações de compra sob suas próprias políticas.

A expiração de uma assinatura não exclui seus registros existentes. Exportação e exclusão continuam disponíveis sem uma assinatura ativa.

## Site oficial

[doneat.app](https://doneat.app) é um site estático. Ele não coleta seu turno ou salário. Abrir a raiz do site, ou um caminho curto como `/privacy` ou `/download`, segue o idioma do seu navegador e te envia para esse hall ou para a página de suporte em inglês ou chinês simplificado. O idioma permanece na URL da página; este site não define um cookie de idioma.

Para hospedar as páginas, a Vercel pode processar informações de conexão comuns como endereço IP e identificador do navegador sob sua própria política de privacidade. Este projeto não armazena essas informações nem as usa para criar um perfil sobre você.

O site oficial usa as análises sem cookies da Vercel para medir visualizações de página e desempenho de carregamento, e um pequeno conjunto de contadores agregados para ver quais entradas as pessoas usam. Os eventos vêm de uma lista fixa e pública — por exemplo `hall_view`, `download_view`, `download_from_web`, `web_timer_open` ou `app_store_open` — e são incrementados por dia. A solicitação carrega apenas o nome do evento. Não inclui um identificador de usuário, sessão, idioma, horário ou salário, e não pode ser usada para identificar ou rastrear uma pessoa.

A lista completa de eventos está neste repositório em [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Análises do temporizador web

O temporizador web em [off.rainif.com](https://off.rainif.com) também usa as análises sem cookies da Vercel para medir visualizações de página e desempenho de carregamento. Ele usa um conjunto separado e limitado de contadores agregados para entender o uso geral de recursos.

Eventos de produto vêm de outra lista fixa e pública, como `share_open` ou `countdown_start`, e são agregados por dia. Eles não contêm identificadores de usuário, informações de sessão, horários ou dados salariais e não podem ser usados para identificar ou rastrear um indivíduo.

A lista completa de eventos de produto está disponível no repositório de código aberto do produto. Provedores de hospedagem e análise podem processar informações de conexão padrão sob suas respectivas políticas de privacidade. Este projeto não armazena essas informações separadamente nem as usa para criar perfis de usuário.

## Cookies

O temporizador web usa um cookie chamado `i18nextLng` para armazenar um código de idioma para que visitas posteriores possam abrir no idioma que você escolheu. Ele é definido na primeira visita a partir do idioma atualmente exibido, atualiza quando você muda de idioma, expira após um ano e pode ser removido no seu navegador.

Nem o site oficial nem o temporizador web usam cookies de publicidade ou rastreamento entre sites. As análises descritas acima não dependem de cookies.

## Compartilhando uma contagem regressiva

A URL de um link de compartilhamento contém apenas os horários de início e fim. Não contém informações salariais. Uma pessoa que abre o link pode ver apenas os horários do turno. As imagens de contagem regressiva compartilhadas também omitem o salário. Uma exportação de backup é diferente: pode conter salário e os outros dados pessoais listados acima.

Se você escolher compartilhar por um serviço social de terceiros, a política de privacidade desse serviço se aplica.

## Apps no seu celular e computador

Os apps de iPhone, iPad, Mac e Windows não coletam análises de uso.

Uma versão desktop instalada do GitHub verifica ao iniciar se existe uma versão mais nova. A solicitação não contém conta, salário ou dados de uso, e um instalador só é baixado depois que você confirmar uma atualização. Se o GitHub não puder ser acessado diretamente, você pode escolher tentar novamente por um mirror de terceiros. As atualizações baixadas por qualquer canal são verificadas por assinatura antes da instalação.

Uma versão instalada da Microsoft Store não inicia verificações de atualização. As atualizações são fornecidas pela Microsoft Store.

Os lembretes são agendados e exibidos localmente pelo sistema operacional. Os apps também acessam a rede quando você abre um link externo ou escolhe compartilhar por um serviço de terceiros.

## Widgets, Atividades em tempo real e proteção do dispositivo

Widgets e Atividades em tempo real usam as informações necessárias para mostrar seu temporizador e progresso, incluindo informações de Foco quando aplicável. Eles não incluem salário. As notificações locais também omitem o salário. Essas superfícies podem ser visíveis na sua tela inicial ou de bloqueio; você pode gerenciar sua visibilidade e permissões de notificação nas configurações do app e do sistema.

Quando o DoneAt pede que você se autentique para proteger ganhos ou registros, a autenticação é tratada pelo dispositivo através do Face ID, Touch ID ou seu código. O DoneAt recebe o resultado da autenticação, não seus dados biométricos ou código. Essa proteção é configurada separadamente em cada dispositivo.

## Serviços de terceiros

O DoneAt usa os seguintes serviços para hospedar páginas, medir o site oficial e o temporizador web, distribuir apps e abrir links que você escolher:

- Vercel — hospedagem do site oficial e do temporizador web; medição de visualizações de página e desempenho em ambos
- Upstash — armazenamento de contagens de eventos agregados diários para o site oficial e o temporizador web
- GitHub — código fonte, informações de lançamento e verificações de atualização para versões desktop distribuídas pelo GitHub
- Apple — distribuição de apps, pagamentos do Plus e verificação de compras através da App Store e StoreKit, e sincronização privada do iCloud quando você escolhe ativá-la no iPhone ou iPad
- Microsoft — distribuição e atualizações para a listagem da Microsoft Store que você abre
- Um mirror de download de terceiros, usado apenas quando você o escolhe de uma versão desktop distribuída pelo GitHub
- O serviço social de terceiros que você escolhe ao compartilhar uma contagem regressiva

## Excluindo seus dados

No temporizador web, limpe os dados deste site no seu navegador, incluindo armazenamento local e o cookie de idioma. No Mac ou Windows, desinstale o app e exclua seus dados.

No iPhone e iPad, a desinstalação remove os dados armazenados nesse dispositivo. Se você ativou a sincronização com o iCloud, a cópia privada do iCloud permanece disponível para seus outros dispositivos. Excluir do iCloud nas configurações de Registros e dados do DoneAt exclui a cópia do iCloud e limpa os registros sincronizados associados em dispositivos conectados a essa Conta Apple quando eles sincronizarem. Remover registros apenas deste dispositivo deixa a cópia do iCloud disponível para restaurar. Arquivos de backup que você exportou anteriormente devem ser excluídos separadamente dos lugares onde você os salvou ou compartilhou.

O DoneAt não pode acessar sua Conta Apple nem excluir seus dados privados do iCloud em seu nome. O DoneAt também não pode acessar ou excluir seus dados locais de um servidor.

## Alterações nesta política

Quando esta política for atualizada, a data de última atualização no topo da página também será revisada. Mudanças importantes serão listadas nas notas de lançamento, e versões anteriores estão disponíveis no histórico de commits do repositório de código aberto.

## Contate-nos

Perguntas sobre esta política, ou sobre como as informações são tratadas, vão para [hello@doneat.app](mailto:hello@doneat.app). Problemas de produto e sugestões também podem ser enviados através de [Issues do GitHub](https://github.com/ififi2017/Off-Work-Countdown/issues).

Se você identificar uma diferença entre esta política e o comportamento real do produto, escreva para esse endereço ou abra um issue.
