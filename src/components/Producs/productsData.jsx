import imgbanhmi from './imgProducts/banhmi.jpg';
import imgbanhkemdau from './imgProducts/banhkemdau.jpg';
import imgbanhsu from './imgProducts/banhsukem.jpg';
import imgbanhcookie from './imgProducts/banhcookie.jpg';
import imgbanhbaonhanhdauxanh from './imgProducts/banhbaonhanhdauxanh.jpg';
import imgbanhmithitnguoi from './imgProducts/banhmithitnguoi.jpg';
import imgbanhmigaxe from './imgProducts/banhmigaxe.jpg';
import imgbanhmipate from './imgProducts/banhmipate.jpg';
import imgbanhkemchocolate from './imgProducts/banhkemchocolate.jpg';
import imgbanhkemmatcha from './imgProducts/banhkemmatcha.jpg';
import imgbanhkemsinhnhat from './imgProducts/banhkemsinhnhat.jpg';
import ingbanhkemtiramisu from './imgProducts/banhkemtiramisu.jpg';
import imgbanhkemtrungmuoi from './imgProducts/banhkemtrungmuoi.jpg';
import imgbanhcupkey from './imgProducts/banhcupkey.jpg';
import ingbanhdonut from './imgProducts/banhdonut.jpg';
import imgbanhngotsocola from './imgProducts/banhngotsocola.jpg';
import imgbanhquyhatdieu from './imgProducts/banhquyhatdieu.jpg';
import imgbanhquybo from './imgProducts/banhquybo.jpg';
import imgbanhquymeden from './imgProducts/banhquymeden.jpg';
import imgbanhquymut from './imgProducts/banhquymut.jpg';
import imgbanhchaykhoaimon from './imgProducts/banhchaykhoaimon.jpg';
import imgbanhchayhatsen from './imgProducts/banhchayhatsen.jpg';
import imgbanhchaydua from './imgProducts/banhchaydua.jpg';
import imgbanhchayngucoc from './imgProducts/banhchayngucoc.jpg';
import imgbanhmiphomai from './imgProducts/banhmiphomai.jpg';

// Define a fallback image URL for production deployment
const FALLBACK_IMG = 'https://placehold.jp/300x200.png?text=Bakery+Product';

// Function to handle image properly for both development and production
const getImageUrl = (importedImage) => {
  // For development environment, use the imported image
  if (importedImage && typeof importedImage === 'string') {
    return importedImage;
  }
  
  // For production (Vercel), use the fallback
  return FALLBACK_IMG;
};

const productsData = [
  {
    id: 1,
    img: getImageUrl(imgbanhmi),
    title: "Bánh Mì",
    description: "Bánh mì thơm bơ sữa",
    type: "Bánh Mì",
    price: 25000,
    rating: 4.8,
    sale: 50,
    numOfPurchase: 150
  },
  {
    id: 2,
    img: getImageUrl(imgbanhkemdau),
    title: "Bánh Kem Dâu",
    description: "Bánh kem mềm mịn, phủ dâu tươi và kem béo ngậy",
    type: "Bánh Kem",
    price: 120000,
    rating: 4.9,
    sale: 10,
    numOfPurchase: 200
  },
  {
    id: 3,
    img: getImageUrl(imgbanhsu),
    title: "Bánh Su Kem",
    description: "Lớp vỏ giòn, nhân kem sữa béo mịn tan trong miệng",
    type: "Bánh Ngọt",
    price: 10000,
    rating: 4.7,
    sale: 20,
    numOfPurchase: 300
  },
  {
    id: 4,
    img: getImageUrl(imgbanhcookie),
    title: "Bánh Quy Chocolate",
    description: "Bánh quy giòn rụm, vị socola đậm đà",
    type: "Bánh Quy",
    price: 15000,
    rating: 4.6,
    sale: 30,
    numOfPurchase: 250
  },
  {
    id: 5,
    img: getImageUrl(imgbanhbaonhanhdauxanh),
    title: "Bánh Chay Đậu Xanh",
    description: "Ngọt thanh, mềm mịn, phù hợp người ăn chay",
    type: "Bánh Chay",
    price: 20000,
    rating: 4.5,
    sale: 0,
    numOfPurchase: 100
  },
  // Bánh Mì
  {
    id: 6,
    img: getImageUrl(imgbanhmiphomai),
    title: "Bánh Mì Phô Mai",
    description: "Bánh mì mềm, nhân phô mai chảy béo ngậy",
    type: "Bánh Mì",
    price: 30000,
    rating: 4.6,
    sale: 10,
    numOfPurchase: 80
  },
  {
    id: 7,
    img: getImageUrl(imgbanhmithitnguoi),
    title: "Bánh Mì Thịt Nguội",
    description: "Bánh mì kẹp thịt nguội, rau sống tươi ngon",
    type: "Bánh Mì",
    price: 35000,
    rating: 4.4,
    sale: 5,
    numOfPurchase: 90
  },
  {
    id: 8,
    img: getImageUrl(imgbanhmigaxe),
    title: "Bánh Mì Gà Xé",
    description: "Nhân gà xé đậm đà, cay nhẹ",
    type: "Bánh Mì",
    price: 32000,
    rating: 4.5,
    sale: 15,
    numOfPurchase: 70
  },
  {
    id: 9,
    img: getImageUrl(imgbanhmipate),
    title: "Bánh Mì Pate",
    description: "Bánh mì pate thơm béo, ăn kèm dưa leo và đồ chua",
    type: "Bánh Mì",
    price: 28000,
    rating: 4.3,
    sale: 0,
    numOfPurchase: 60
  },
  // Bánh Kem
  {
    id: 10,
    img: getImageUrl(imgbanhkemchocolate),
    title: "Bánh Kem Chocolate",
    description: "Lớp kem chocolate mềm, phủ socola tươi",
    type: "Bánh Kem",
    price: 130000,
    rating: 4.7,
    sale: 20,
    numOfPurchase: 95
  },
  {
    id: 11,
    img: getImageUrl(imgbanhkemmatcha),
    title: "Bánh Kem Matcha",
    description: "Hương vị trà xanh Nhật Bản dịu nhẹ",
    type: "Bánh Kem",
    price: 125000,
    rating: 4.8,
    sale: 15,
    numOfPurchase: 85
  },
  {
    id: 12,
    img: getImageUrl(imgbanhkemsinhnhat),
    title: "Bánh Kem Sinh Nhật",
    description: "Trang trí đẹp mắt, phù hợp mọi buổi tiệc",
    type: "Bánh Kem",
    price: 150000,
    rating: 4.9,
    sale: 25,
    numOfPurchase: 110
  },
  {
    id: 13,
    img: getImageUrl(ingbanhkemtiramisu),
    title: "Bánh Kem Tiramisu",
    description: "Hương vị Ý cổ điển, thơm cà phê nhẹ",
    type: "Bánh Kem",
    price: 140000,
    rating: 4.6,
    sale: 5,
    numOfPurchase: 75
  },
  // Bánh Ngọt
  {
    id: 14,
    img: getImageUrl(imgbanhkemtrungmuoi),
    title: "Bánh Ngọt Trứng Muối",
    description: "Mặn ngọt hài hòa, lớp trứng muối tan chảy",
    type: "Bánh Ngọt",
    price: 18000,
    rating: 4.5,
    sale: 10,
    numOfPurchase: 60
  },
  {
    id: 15,
    img: getImageUrl(imgbanhcupkey),
    title: "Bánh Cupcake",
    description: "Trang trí bắt mắt, vị vani nhẹ nhàng",
    type: "Bánh Ngọt",
    price: 15000,
    rating: 4.4,
    sale: 10,
    numOfPurchase: 70
  },
  {
    id: 16,
    img: getImageUrl(ingbanhdonut),
    title: "Bánh Donut",
    description: "Bánh vòng rán ngọt, phủ đường hoặc socola",
    type: "Bánh Ngọt",
    price: 12000,
    rating: 4.3,
    sale: 5,
    numOfPurchase: 50
  },
  {
    id: 17,
    img: getImageUrl(imgbanhngotsocola),
    title: "Bánh Ngọt Socola",
    description: "Đậm vị cacao, mềm mịn và ít ngọt",
    type: "Bánh Ngọt",
    price: 17000,
    rating: 4.6,
    sale: 20,
    numOfPurchase: 80
  },
  // Bánh Quy
  {
    id: 18,
    img: getImageUrl(imgbanhquyhatdieu),
    title: "Bánh Quy Hạt Điều",
    description: "Giòn rụm, thơm vị hạt điều rang",
    type: "Bánh Quy",
    price: 20000,
    rating: 4.5,
    sale: 10,
    numOfPurchase: 40
  },
  {
    id: 19,
    img: getImageUrl(imgbanhquybo),
    title: "Bánh Quy Bơ",
    description: "Dễ ăn, hợp với trà chiều",
    type: "Bánh Quy",
    price: 18000,
    rating: 4.4,
    sale: 15,
    numOfPurchase: 55
  },
  {
    id: 20,
    img: getImageUrl(imgbanhquymeden),
    title: "Bánh Quy Mè Đen",
    description: "Giòn thơm, vị mè đậm đà",
    type: "Bánh Quy",
    price: 16000,
    rating: 4.2,
    sale: 0,
    numOfPurchase: 45
  },
  {
    id: 21,
    img: getImageUrl(imgbanhquymut),
    title: "Bánh Quy Mứt",
    description: "Nhân mứt trái cây ngọt nhẹ",
    type: "Bánh Quy",
    price: 22000,
    rating: 4.6,
    sale: 5,
    numOfPurchase: 50
  },
  // Bánh Chay
  {
    id: 22,
    img: getImageUrl(imgbanhchaykhoaimon),
    title: "Bánh Chay Khoai Môn",
    description: "Nhân khoai môn mịn và ngọt tự nhiên",
    type: "Bánh Chay",
    price: 21000,
    rating: 4.5,
    sale: 5,
    numOfPurchase: 30
  },
  {
    id: 23,
    img: getImageUrl(imgbanhchayhatsen),
    title: "Bánh Chay Hạt Sen",
    description: "Nhân hạt sen thanh đạm, dễ tiêu hóa",
    type: "Bánh Chay",
    price: 25000,
    rating: 4.6,
    sale: 10,
    numOfPurchase: 40
  },
  {
    id: 24,
    img: getImageUrl(imgbanhchaydua),
    title: "Bánh Bao Chay Dừa",
    description: "Nhân dừa thơm, vỏ bánh dai nhẹ",
    type: "Bánh Chay",
    price: 23000,
    rating: 4.4,
    sale: 0,
    numOfPurchase: 35
  },
  {
    id: 25,
    img: getImageUrl(imgbanhchayngucoc),
    title: "Bánh Chay Ngũ Cốc",
    description: "Tốt cho sức khỏe, vị ngọt nhẹ từ ngũ cốc",
    type: "Bánh Chay",
    price: 27000,
    rating: 4.7,
    sale: 20,
    numOfPurchase: 38
  }
];

export default productsData;
