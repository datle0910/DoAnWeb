import React, { useState } from 'react';
import { FaTruck, FaExchangeAlt, FaShieldAlt, FaBoxOpen, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ShippingPolicy = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-[800px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold mb-4">
            {activeTab === 'shipping' ? 'Chính Sách Vận Chuyển' : 'Chính Sách Đổi Trả'}
          </h1>
          <p data-aos="fade-up" className="text-gray-600">
            {activeTab === 'shipping' 
              ? 'Chúng tôi cam kết đảm bảo sản phẩm đến tay bạn một cách nhanh chóng và an toàn.' 
              : 'Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và sẵn sàng hỗ trợ đổi trả.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`py-3 px-6 text-sm font-medium rounded-l-lg border ${
                activeTab === 'shipping'
                  ? 'bg-[#deb658] text-white border-[#deb658]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <FaTruck className="inline-block mr-2" />
              Chính Sách Vận Chuyển
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('return')}
              className={`py-3 px-6 text-sm font-medium rounded-r-lg border ${
                activeTab === 'return'
                  ? 'bg-[#deb658] text-white border-[#deb658]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <FaExchangeAlt className="inline-block mr-2" />
              Chính Sách Đổi Trả
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'shipping' ? (
            <div className="p-6" data-aos="fade-up">
              {/* Shipping Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full text-amber-600 flex items-center justify-center mx-auto mb-3">
                    <FaTruck size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Miễn Phí Vận Chuyển</h3>
                  <p className="text-sm text-gray-600">Cho đơn hàng trên 200.000đ trong nội thành</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Phạm Vi Giao Hàng</h3>
                  <p className="text-sm text-gray-600">Giao hàng toàn quốc qua các đơn vị vận chuyển</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full text-green-600 flex items-center justify-center mx-auto mb-3">
                    <FaClock size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Thời Gian Giao Hàng</h3>
                  <p className="text-sm text-gray-600">Nội thành: 2-8h, Ngoại thành: 24-48h</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Phương Thức Vận Chuyển</h2>
                  <p className="text-gray-600 mb-3">
                    Tiệm Bánh chúng tôi cung cấp nhiều phương thức vận chuyển khác nhau để đảm bảo sản phẩm đến tay khách hàng một cách nhanh chóng và an toàn:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Giao hàng nhanh nội thành (2-8 giờ)</li>
                    <li>Giao hàng tiêu chuẩn toàn quốc (1-3 ngày)</li>
                    <li>Đối tác vận chuyển: Giao Hàng Nhanh, Grab, Gojek, Baemin, GHTK</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Phí Vận Chuyển</h2>
                  <p className="text-gray-600 mb-3">
                    Phí vận chuyển được tính dựa trên khoảng cách vận chuyển và trọng lượng đơn hàng:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Nội thành: 15.000đ - 30.000đ (miễn phí cho đơn hàng từ 200.000đ)</li>
                    <li>Ngoại thành: 30.000đ - 50.000đ (miễn phí cho đơn hàng từ 500.000đ)</li>
                    <li>Các tỉnh thành khác: Tùy thuộc vào khoảng cách và trọng lượng</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Thời Gian Giao Hàng</h2>
                  <p className="text-gray-600 mb-3">
                    Thời gian giao hàng có thể thay đổi tùy thuộc vào địa điểm và phương thức vận chuyển:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Nội thành: 2-8 giờ kể từ khi xác nhận đơn hàng</li>
                    <li>Các tỉnh lân cận: 24-48 giờ kể từ khi xác nhận đơn hàng</li>
                    <li>Các tỉnh xa: 2-5 ngày kể từ khi xác nhận đơn hàng</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Lưu Ý Khi Nhận Hàng</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Kiểm tra tình trạng đóng gói trước khi nhận hàng</li>
                    <li>Kiểm tra sản phẩm đúng loại và số lượng đã đặt</li>
                    <li>Liên hệ ngay với chúng tôi nếu có bất kỳ vấn đề nào</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6" data-aos="fade-up">
              {/* Return Policy Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-rose-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-rose-100 rounded-full text-rose-600 flex items-center justify-center mx-auto mb-3">
                    <FaExchangeAlt size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Đổi Trả Dễ Dàng</h3>
                  <p className="text-sm text-gray-600">Đổi trả trong vòng 24h kể từ khi nhận hàng</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full text-purple-600 flex items-center justify-center mx-auto mb-3">
                    <FaShieldAlt size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Bảo Đảm Chất Lượng</h3>
                  <p className="text-sm text-gray-600">Đổi mới 100% nếu sản phẩm lỗi từ nhà sản xuất</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full text-teal-600 flex items-center justify-center mx-auto mb-3">
                    <FaBoxOpen size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">Hoàn Tiền</h3>
                  <p className="text-sm text-gray-600">Hoàn tiền nhanh chóng nếu không hài lòng</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Điều Kiện Đổi Trả</h2>
                  <p className="text-gray-600 mb-3">
                    Chúng tôi chấp nhận đổi trả sản phẩm trong các trường hợp sau:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Sản phẩm bị lỗi do nhà sản xuất</li>
                    <li>Sản phẩm không đúng với mô tả hoặc hình ảnh trên website</li>
                    <li>Sản phẩm không đúng với đơn đặt hàng</li>
                    <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Thời Hạn Đổi Trả</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Đối với sản phẩm bánh tươi: trong vòng 24 giờ kể từ khi nhận hàng</li>
                    <li>Đối với sản phẩm bánh khô, bánh đóng gói: trong vòng 3 ngày kể từ khi nhận hàng</li>
                    <li>Đối với các sản phẩm phụ kiện: trong vòng 7 ngày kể từ khi nhận hàng</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Quy Trình Đổi Trả</h2>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Liên hệ với chúng tôi qua hotline: 1900 1234 hoặc email: hotro@tiembanh.vn</li>
                    <li>Cung cấp mã đơn hàng, hình ảnh sản phẩm và lý do đổi trả</li>
                    <li>Nhận hướng dẫn từ nhân viên chăm sóc khách hàng</li>
                    <li>Gửi trả sản phẩm theo hướng dẫn (đối với trường hợp hoàn trả)</li>
                    <li>Nhận sản phẩm thay thế hoặc hoàn tiền (trong vòng 3-7 ngày làm việc)</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Những Trường Hợp Không Áp Dụng Đổi Trả</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Sản phẩm đã qua sử dụng hoặc đã bị mở niêm phong</li>
                    <li>Sản phẩm bị hư hỏng do lỗi của người sử dụng</li>
                    <li>Sản phẩm đã hết hạn đổi trả</li>
                    <li>Không có hóa đơn mua hàng hoặc không xác định được nguồn gốc mua hàng</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Chính Sách Hoàn Tiền</h2>
                  <p className="text-gray-600 mb-3">
                    Sau khi nhận được sản phẩm trả lại và xác nhận hợp lệ, chúng tôi sẽ tiến hành hoàn tiền theo phương thức:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Chuyển khoản ngân hàng: hoàn tiền trong 3-5 ngày làm việc</li>
                    <li>Ví điện tử: hoàn tiền trong 1-3 ngày làm việc</li>
                    <li>Tiền mặt: hoàn tiền tại cửa hàng trong giờ làm việc</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy; 