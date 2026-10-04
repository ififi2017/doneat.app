---
title: "Chính sách quyền riêng tư — DoneAt"
description: "DoneAt lưu dữ liệu trên máy theo mặc định, có đồng bộ iCloud riêng tùy chọn trên iPhone và iPad, và xử lý phân tích cùng dịch vụ bên thứ ba thế nào."
heading: "Chính sách quyền riêng tư"
intro: "Trang này giải thích DoneAt lưu và xử lý thông tin thế nào: trang chính thức, bộ đếm web, và ứng dụng trên iPhone, iPad, Android, Mac và Windows."
updatedLabel: "Cập nhật lần cuối"
updated: "4 tháng 10 năm 2026"
---

## Dữ liệu DoneAt lưu

Thông tin bạn nhập được lưu trên máy theo mặc định: trong bộ nhớ cục bộ của trình duyệt với bộ đếm web, và trong dữ liệu ứng dụng trên iPhone, iPad, Android, Mac và Windows. DoneAt không có tài khoản sản phẩm và không gửi thông tin này tới máy chủ DoneAt.

Trên iPhone và iPad, bạn có thể chọn bật đồng bộ iCloud. Nó lưu lịch, bản ghi, lương, tùy chọn nhắc, giao diện, ngôn ngữ, hồ sơ cuộc sống và dữ liệu Tập trung trong cơ sở dữ liệu iCloud riêng dưới Tài khoản Apple của bạn. Quyền thông báo, bảo vệ sinh trắc, cài đặt Hoạt động trực tiếp, bộ đếm công việc hiện tại và trạng thái thiết lập ban đầu ở trên từng thiết bị. Bộ đếm web, ứng dụng Android, Mac và ứng dụng Windows vẫn ở máy và không thuộc lần đồng bộ này.

Bộ đếm ngược, tiến độ và ước tính thu nhập được tính trên thiết bị của bạn từ thông tin này.

Thường gồm:

- Giờ bắt đầu và giờ kết thúc, ngày làm việc, cùng cài đặt nghỉ hoặc tăng ca
- Số lương, kỳ trả lương và lịch sử lương trong sự nghiệp
- Bản ghi công việc và chỉnh sửa, giai đoạn sự nghiệp, cùng cột mốc cuộc sống hoặc ngày bạn chọn nhập
- Tiêu đề việc Tập trung, kế hoạch, phiên và cài đặt nghỉ
- Tùy chọn thông báo và nhắc
- Ngôn ngữ và giao diện

## Đồng bộ iCloud tùy chọn

Đồng bộ tắt theo mặc định. Khi bạn bật trên iPhone hoặc iPad, dịch vụ CloudKit của Apple lưu dữ liệu mô tả ở trên trong cơ sở dữ liệu riêng gắn với Tài khoản Apple của bạn. DoneAt không nhận một bản sao trên máy chủ của mình. Thiết bị dùng cùng Tài khoản Apple có thể khôi phục và đồng bộ dữ liệu đó; việc này cần tài khoản iCloud dùng được và kết nối mạng.

Bật đồng bộ cần DoneAt Plus. Đồng bộ đã bật tiếp tục sau khi đăng ký hết hạn. Tắt đồng bộ sẽ dừng đồng bộ trên thiết bị đó và giữ cả bản cục bộ hiện tại lẫn bản iCloud đang có. Tắt không xóa bản nào trong hai bản.

## Android

Ứng dụng Android đang thử nghiệm; khả năng tải và mua Plus phụ thuộc vào bản phát hành Google Play. Dữ liệu công việc và cài đặt mặc định nằm trong bộ nhớ riêng của ứng dụng, không có tài khoản DoneAt hay phân tích hành vi sử dụng trong ứng dụng.

Sao lưu hệ thống và chuyển thiết bị có thể chứa bản ghi, lương, lịch sử nghề nghiệp, hồ sơ cuộc sống, dữ liệu Focus và cài đặt ban đầu chưa hoàn tất. Điều này tùy thiết bị, tài khoản và cài đặt hệ thống; DoneAt không nhận bản sao trên máy chủ. Bộ đếm đang chạy, sổ nhắc nhở đã lên lịch và bằng chứng mua hàng bị loại trừ. Sau khi khôi phục, nhắc nhở được lập lại và giao dịch được kiểm tra lại. Không tự đồng bộ Google Drive hoặc với iPhone. Bản xuất thủ công là JSON đọc được, có thể chứa lương và tạo bản sao riêng tại nơi bạn chọn.

Google Play xử lý mua hàng và đánh giá tùy chọn. DoneAt không nhận thông tin thẻ hay kết quả cho biết bạn đã gửi đánh giá chưa. Bằng chứng gồm sản phẩm và mã thông báo được lưu trên máy, ngoài sao lưu hệ thống. Có thể kiểm tra khi mở hoặc quay lại ứng dụng, khôi phục mua hàng hoặc thử xác nhận lại. Khi bật xác minh máy chủ, mã thông báo, sản phẩm và mã yêu cầu ngẫu nhiên được gửi qua HTTPS tới `api.doneat.app` trên Cloudflare. Google gửi thay đổi qua Cloud Pub/Sub. Dịch vụ hỏi Google về trạng thái và thời điểm hết hạn chính xác, rồi trả bằng chứng có chữ ký, không nhận dữ liệu công việc hay bản sao lưu.

Cơ sở dữ liệu lưu giá trị băm của mã thông báo, sản phẩm, trạng thái và thời hạn quyền truy cập, thời điểm xác minh, cờ mua thử, giá trị băm của mã thay thế và số sửa đổi để xác minh, khôi phục và ngăn dùng lại giao dịch đã thay thế. ID thông báo được khử trùng lặp trong khoảng 30 ngày; mục cũ bị xóa khi xử lý thông báo sau. Mã gốc và phản hồi Google chỉ được xử lý tạm thời, không lưu trong cơ sở dữ liệu hoặc nhật ký ứng dụng. Giới hạn theo IP là tạm thời; DoneAt không lưu IP hoặc giá trị băm của IP trong cơ sở dữ liệu. Google và Cloudflare xử lý lưu lượng theo chính sách riêng. Mã mua hàng không dùng cho quảng cáo hay lập hồ sơ sử dụng.

Nhắc nhở được lên lịch trên máy. Xác thực thiết bị chỉ trả kết quả, không gửi sinh trắc học hay PIN. Backdrop (AndroidLiquidGlass) và Shapes vẽ trên máy, không gửi nội dung hoặc mã định danh cho tác giả; nguồn và giấy phép tại [Giới thiệu](/vi/about#android).

Xóa dữ liệu trên máy trong ứng dụng, bằng cách xóa bộ nhớ ứng dụng hoặc gỡ cài đặt. Xóa riêng bản xuất và sao lưu hệ thống tại nhà cung cấp lưu trữ. Để xóa bản ghi mua hàng trên máy chủ, liên hệ [hello@doneat.app](mailto:hello@doneat.app). Xóa cục bộ không tự xóa bản ghi máy chủ hoặc hủy thuê bao; quản lý thuê bao trong Google Play. Vẫn có thể xuất và xóa khi không có Plus còn hiệu lực.


## Xuất bản sao lưu

Trên iPhone và iPad, bản xuất sao lưu chỉ được tạo khi bạn chọn Xuất. Bản sao lưu đầy đủ gồm bản ghi, cài đặt đã đồng bộ, lương và lịch sử lương trong sự nghiệp, hồ sơ cuộc sống, cùng việc và phiên Tập trung. Bạn cũng có thể xuất mà không có hồ sơ cuộc sống; lựa chọn đó vẫn gồm lương và lịch sử sự nghiệp. Bảng chia sẻ của hệ thống rồi cho bạn chọn nơi lưu hoặc chia sẻ tệp.

Bản xuất là tệp JSON đọc được, không phải kho lưu trữ khóa bằng mật khẩu. Chọn nơi lưu và người nhận phù hợp với thông tin trong đó. Tệp bạn lưu hoặc chia sẻ là bản sao riêng; xóa dữ liệu trong DoneAt không xóa những tệp đó.

## Mua Plus

Trên iPhone và iPad, Apple xử lý đăng ký Plus và mua trọn đời qua App Store. DoneAt dùng StoreKit để xác minh trạng thái mua và khôi phục quyền truy cập, và giữ một bản ghi cục bộ về quyền đã xác minh cùng ngày hết hạn nếu có. DoneAt không nhận chi tiết thẻ thanh toán và không gửi trạng thái mua tới máy chủ tài khoản DoneAt. Apple xử lý thông tin mua theo chính sách của mình.

Đăng ký hết hạn không xóa bản ghi hiện có. Xuất và xóa vẫn dùng được khi không còn đăng ký đang hoạt động.

## Trang chính thức

[doneat.app](https://doneat.app) là trang web tĩnh. Nó không thu thập ca làm hoặc lương của bạn. Mở gốc trang, hoặc một đường dẫn ngắn như `/privacy` hay `/download`, theo ngôn ngữ trình duyệt và đưa bạn tới sảnh đó hoặc tới trang hỗ trợ tiếng Anh hoặc tiếng Trung giản thể. Ngôn ngữ nằm trong URL trang; trang này không đặt cookie ngôn ngữ.

Để lưu trữ các trang, Vercel có thể xử lý thông tin kết nối thông thường như địa chỉ IP và mã định danh trình duyệt theo chính sách quyền riêng tư của mình. Dự án này không lưu thông tin đó và không dùng nó để lập hồ sơ về bạn.

Trang chính thức dùng phân tích không cookie của Vercel để đo lượt xem trang và hiệu năng tải, cùng một tập nhỏ bộ đếm tổng hợp để xem người ta dùng lối vào nào. Sự kiện đến từ một danh sách cố định, công khai — ví dụ `hall_view`, `download_view`, `download_from_web`, `web_timer_open` hoặc `app_store_open` — và tăng theo ngày. Yêu cầu chỉ mang tên sự kiện. Nó không gồm mã định danh người dùng, phiên, ngôn ngữ, lịch hoặc lương, và không dùng để nhận diện hoặc theo dõi một người.

Danh sách sự kiện đầy đủ nằm trong kho này tại [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Phân tích bộ đếm web

Bộ đếm web tại [off.rainif.com](https://off.rainif.com) cũng dùng phân tích không cookie của Vercel để đo lượt xem trang và hiệu năng tải. Nó dùng một tập bộ đếm tổng hợp riêng, có giới hạn, để hiểu mức dùng tính năng nói chung.

Sự kiện sản phẩm đến từ một danh sách cố định, công khai khác, như `share_open` hoặc `countdown_start`, và được tổng hợp theo ngày. Chúng không chứa mã định danh người dùng, thông tin phiên, lịch hoặc dữ liệu lương, và không dùng để nhận diện hoặc theo dõi một cá nhân.

Danh sách sự kiện sản phẩm đầy đủ có trong kho mã nguồn mở của sản phẩm. Nhà cung cấp lưu trữ và phân tích có thể xử lý thông tin kết nối chuẩn theo chính sách quyền riêng tư của họ. Dự án này không lưu riêng thông tin đó và không dùng nó để lập hồ sơ người dùng.

## Cookie

Bộ đếm web dùng một cookie tên `i18nextLng` để lưu mã ngôn ngữ, để các lần vào sau mở bằng ngôn ngữ bạn đã chọn. Nó được đặt ở lần vào đầu tiên từ ngôn ngữ đang hiển thị, cập nhật khi bạn đổi ngôn ngữ, hết hạn sau một năm, và xóa được trong trình duyệt.

Cả trang chính thức lẫn bộ đếm web đều không dùng cookie quảng cáo hoặc theo dõi xuyên trang. Phân tích mô tả ở trên không dựa vào cookie.

## Chia sẻ bộ đếm ngược

URL của liên kết chia sẻ chỉ chứa giờ bắt đầu và giờ kết thúc. Nó không chứa thông tin lương. Người mở liên kết chỉ xem được giờ ca. Ảnh chia sẻ bộ đếm cũng bỏ lương. Bản xuất sao lưu thì khác: nó có thể chứa lương và dữ liệu cá nhân khác liệt kê ở trên.

Nếu bạn chọn chia sẻ qua một dịch vụ xã hội bên thứ ba, chính sách quyền riêng tư của dịch vụ đó được áp dụng.

## Ứng dụng trên điện thoại và máy tính

Ứng dụng iPhone, iPad, Mac và Windows không thu thập phân tích sử dụng.

Bản dựng máy tính cài từ GitHub kiểm tra bản phát hành mới hơn khi khởi động. Yêu cầu không chứa tài khoản, lương hoặc dữ liệu sử dụng, và bộ cài chỉ được tải sau khi bạn xác nhận cập nhật. Nếu không tới được GitHub trực tiếp, bạn có thể chọn thử lại qua một máy nhân bản bên thứ ba. Bản cập nhật tải qua kênh nào cũng được kiểm tra chữ ký trước khi cài.

Bản cài từ Microsoft Store không tự bắt đầu kiểm tra cập nhật. Bản cập nhật do Microsoft Store cung cấp.

Lời nhắc được hệ điều hành lên lịch và hiển thị tại chỗ. Ứng dụng cũng truy cập mạng khi bạn mở một liên kết ngoài hoặc chọn chia sẻ qua dịch vụ bên thứ ba.

## Tiện ích, Hoạt động trực tiếp và bảo vệ thiết bị

Tiện ích và Hoạt động trực tiếp dùng thông tin cần để hiện bộ đếm và tiến độ, gồm thông tin Tập trung khi áp dụng. Chúng không gồm lương. Thông báo cục bộ cũng bỏ lương. Các bề mặt này có thể hiện trên Màn hình chính hoặc Màn hình khóa; bạn quản lý khả năng hiện và quyền thông báo trong ứng dụng và cài đặt hệ thống.

Khi DoneAt yêu cầu bạn xác thực để bảo vệ thu nhập hoặc bản ghi, việc xác thực do thiết bị xử lý qua Face ID, Touch ID hoặc mật mã. DoneAt nhận kết quả xác thực, không nhận dữ liệu sinh trắc hoặc mật mã của bạn. Bảo vệ này được cấu hình riêng trên từng thiết bị.

## Dịch vụ bên thứ ba

DoneAt dùng các dịch vụ sau để lưu trữ trang, đo trang chính thức và bộ đếm web, phân phối ứng dụng và mở liên kết bạn chọn:

- Vercel — lưu trữ trang chính thức và bộ đếm web; đo lượt xem trang và hiệu năng trên cả hai
- Upstash — lưu số đếm sự kiện tổng hợp theo ngày cho trang chính thức và bộ đếm web
- GitHub — mã nguồn, thông tin phát hành, và kiểm tra cập nhật cho bản dựng máy tính phân phối qua GitHub
- Apple — phân phối ứng dụng, thanh toán Plus và xác minh mua qua App Store và StoreKit, cùng đồng bộ iCloud riêng khi bạn chọn bật trên iPhone hoặc iPad
- Microsoft — phân phối và cập nhật cho trang Microsoft Store mà bạn mở
- Một máy nhân bản tải xuống bên thứ ba, chỉ dùng khi bạn chọn nó từ bản dựng máy tính phân phối qua GitHub
- Dịch vụ xã hội bên thứ ba mà bạn chọn khi chia sẻ bộ đếm ngược

## Xóa dữ liệu của bạn

Trên bộ đếm web, hãy xóa dữ liệu trang này trong trình duyệt, gồm bộ nhớ cục bộ và cookie ngôn ngữ. Trên Mac hoặc Windows, gỡ ứng dụng và xóa dữ liệu của nó.

Trên iPhone và iPad, gỡ cài đặt sẽ bỏ dữ liệu lưu trên thiết bị đó. Nếu bạn đã bật đồng bộ iCloud, bản iCloud riêng vẫn còn cho các thiết bị khác của bạn. Xóa khỏi iCloud trong cài đặt Bản ghi & Dữ liệu của DoneAt sẽ xóa bản iCloud và xóa các bản ghi đã đồng bộ liên quan trên thiết bị đăng nhập Tài khoản Apple đó khi chúng đồng bộ lần tới. Chỉ xóa bản ghi khỏi thiết bị này sẽ để lại bản iCloud để khôi phục. Tệp sao lưu bạn đã xuất trước đó phải xóa riêng ở nơi bạn đã lưu hoặc chia sẻ chúng.

DoneAt không truy cập được Tài khoản Apple của bạn hoặc xóa dữ liệu iCloud riêng thay bạn. DoneAt cũng không truy cập hoặc xóa dữ liệu trên máy của bạn từ một máy chủ.

## Thay đổi chính sách này

Khi chính sách này được cập nhật, ngày cập nhật lần cuối ở đầu trang cũng sẽ được sửa. Thay đổi quan trọng sẽ được liệt kê trong ghi chú phát hành, và các bản trước có trong lịch sử commit của kho mã nguồn mở.

## Liên hệ

Câu hỏi về chính sách này, hoặc về cách thông tin được xử lý, gửi tới [hello@doneat.app](mailto:hello@doneat.app). Vấn đề sản phẩm và góp ý cũng có thể gửi qua [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

Nếu bạn thấy khác biệt giữa chính sách này và hành vi thực tế của sản phẩm, hãy viết tới địa chỉ đó hoặc mở một issue.
