export const FLEET_DATA = [
  {
    id: 'zeekr-001-2024',
    name: 'Zeekr 001',
    year: 2024,
    classTitle: 'Премиум Электро',
    category: 'business',
    image: './images/zeekr_001.jpg',
    badge: 'Новинка',
    badgeType: 'new',
    specs: {
      transmission: 'Автомат',
      engine: 'Электро / 544 л.с.',
      consumption: 'Запас хода 580 км',
      seats: '5 мест',
      climate: '3-зонный климат',
      drive: 'Полный'
    },
    pricing: {
      tier1_2: 65000,
      tier3_7: 60000,
      tier8_14: 55000,
      tier15_plus: 50000
    },
    deposit: 150000,
    minAge: 25,
    minExp: 4,
    features: ['Пневмоподвеска', 'Массаж сидений', 'Панорамная крыша', 'Премиум аудио Yamaha']
  },
  {
    id: 'solaris-2023',
    name: 'Hyundai Solaris',
    year: 2023,
    classTitle: 'Эконом+',
    category: 'economy',
    image: './images/hyundai_solaris.jpg',
    badge: 'Хит проката',
    badgeType: 'popular',
    specs: {
      transmission: 'АКПП (6-ст)',
      engine: '1.6 л / 123 л.с.',
      consumption: '6.6 л/100 км',
      seats: '5 мест',
      climate: 'Кондиционер',
      drive: 'Передний',
    },
    pricing: {
      tier1_2: 14300,   // 1-2 дня
      tier3_7: 12650,   // 3-7 дней (-11%)
      tier8_14: 11550,  // 8-14 дней (-19%)
      tier15_plus: 10200 // 15+ дней (-29%)
    },
    deposit: 33000,
    minAge: 21,
    minExp: 2,
    features: ['Bluetooth / Apple CarPlay', 'Подогрев сидений', 'Парктроники', 'Камера заднего вида']
  },
  {
    id: 'polo-2023',
    name: 'Volkswagen Polo',
    year: 2023,
    classTitle: 'Эконом+',
    category: 'economy',
    image: './images/volkswagen_polo.jpg',
    badge: 'Экономный',
    badgeType: 'eco',
    specs: {
      transmission: 'АКПП (Aisin)',
      engine: '1.6 л / 110 л.с.',
      consumption: '6.4 л/100 км',
      seats: '5 мест',
      climate: 'Климат-контроль',
      drive: 'Передний',
    },
    pricing: {
      tier1_2: 14850,
      tier3_7: 13200,
      tier8_14: 12100,
      tier15_plus: 10750
    },
    deposit: 33000,
    minAge: 21,
    minExp: 2,
    features: ['Вместительный багажник 530 л', 'Круиз-контроль', 'LED оптика', 'Bluetooth']
  },
  {
    id: 'octavia-2023',
    name: 'Skoda Octavia A8',
    year: 2023,
    classTitle: 'Комфорт+',
    category: 'comfort',
    image: './images/skoda_octavia.jpg',
    badge: 'Лучший для семьи',
    badgeType: 'popular',
    specs: {
      transmission: 'АКПП (8-ст)',
      engine: '1.4 TSI / 150 л.с.',
      consumption: '5.9 л/100 км',
      seats: '5 мест',
      climate: '2-зонный климат',
      drive: 'Передний',
    },
    pricing: {
      tier1_2: 20900,
      tier3_7: 18700,
      tier8_14: 17050,
      tier15_plus: 15150
    },
    deposit: 55000,
    minAge: 22,
    minExp: 2,
    features: ['Огромный лифтбек', 'Цифровая приборная панель', 'Подогрев руля и всех сидений', 'Apple CarPlay / Android Auto']
  },
  {
    id: 'k5-2023',
    name: 'Kia K5 GT-Line',
    year: 2023,
    classTitle: 'Комфорт+',
    category: 'comfort',
    image: './images/kia_k5.jpg',
    badge: 'Стильный дизайн',
    badgeType: 'accent',
    specs: {
      transmission: 'АКПП (8-ст)',
      engine: '2.5 GDI / 194 л.с.',
      consumption: '7.4 л/100 км',
      seats: '5 мест',
      climate: '2-зонный климат',
      drive: 'Передний',
    },
    pricing: {
      tier1_2: 25300,
      tier3_7: 22550,
      tier8_14: 20350,
      tier15_plus: 18150
    },
    deposit: 66000,
    minAge: 23,
    minExp: 3,
    features: ['Кожаный салон', 'Панорамная крыша', 'Акустика Bose', 'Круговой обзор 360°']
  },
  {
    id: 'jolion-2024',
    name: 'Haval Jolion 4WD',
    year: 2024,
    classTitle: 'Кроссовер',
    category: 'crossover',
    image: './images/haval_jolion.jpg',
    badge: 'Полный привод 4WD',
    badgeType: 'drive',
    specs: {
      transmission: 'Робот (7-ст 2WD/4WD)',
      engine: '1.5 Turbo / 150 л.с.',
      consumption: '7.8 л/100 км',
      seats: '5 мест',
      climate: 'Климат-контроль',
      drive: 'Полный (4WD)',
    },
    pricing: {
      tier1_2: 21450,
      tier3_7: 19250,
      tier8_14: 17350,
      tier15_plus: 15400
    },
    deposit: 55000,
    minAge: 22,
    minExp: 2,
    features: ['Клиренс 190 мм', 'Зимний пакет', 'Адаптивный круиз', 'Бесключевой доступ']
  },
  {
    id: 'monjaro-2024',
    name: 'Geely Monjaro Exclusive',
    year: 2024,
    classTitle: 'Премиум Кроссовер',
    category: 'crossover',
    image: './images/geely_monjaro.jpg',
    badge: 'Новинка 2024',
    badgeType: 'new',
    specs: {
      transmission: 'АКПП (8-ст Aisin)',
      engine: '2.0T Volvo / 238 л.с.',
      consumption: '8.5 л/100 км',
      seats: '5 мест',
      climate: '3-зонный климат',
      drive: 'Полный (BorgWarner)',
    },
    pricing: {
      tier1_2: 42900,
      tier3_7: 39050,
      tier8_14: 35200,
      tier15_plus: 31350
    },
    deposit: 110000,
    minAge: 24,
    minExp: 3,
    features: ['3 экрана на панели', 'Вентиляция и массаж сидений', 'Панорама', 'Проекция на лобовое стекло']
  },
  {
    id: 'camry-2023',
    name: 'Toyota Camry 2.5 GR',
    year: 2023,
    classTitle: 'Бизнес-класс',
    category: 'business',
    image: './images/toyota_camry.jpg',
    badge: 'Бизнес-эталон',
    badgeType: 'popular',
    specs: {
      transmission: 'АКПП (8-ст)',
      engine: '2.5 л / 200 л.с.',
      consumption: '7.1 л/100 км',
      seats: '5 мест',
      climate: '3-зонный климат',
      drive: 'Передний',
    },
    pricing: {
      tier1_2: 35750,
      tier3_7: 32450,
      tier8_14: 29150,
      tier15_plus: 25850
    },
    deposit: 82500,
    minAge: 23,
    minExp: 3,
    features: ['Кожаный салон Nappa', 'Электрорегулировка заднего ряда', 'Шумоизоляция', 'Аудиосистема JBL']
  },
  {
    id: 'mercedes-e200',
    name: 'Mercedes-Benz E 200 4MATIC',
    year: 2023,
    classTitle: 'Премиум',
    category: 'business',
    image: './images/mercedes_e200.jpg',
    badge: 'Премиум',
    badgeType: 'luxury',
    specs: {
      transmission: '9G-TRONIC',
      engine: '2.0 Turbo / 197 л.с.',
      consumption: '7.6 л/100 км',
      seats: '5 мест',
      climate: 'Термотроник',
      drive: 'Полный 4MATIC',
    },
    pricing: {
      tier1_2: 57750,
      tier3_7: 52250,
      tier8_14: 47300,
      tier15_plus: 42350
    },
    deposit: 137500,
    minAge: 25,
    minExp: 4,
    features: ['AMG Line экстерьер', 'Контурная подсветка 64 цвета', 'Burmester Surround', 'Доводчики дверей']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Весь автопарк', count: 8 },
  { id: 'economy', label: 'Эконом', count: 2 },
  { id: 'comfort', label: 'Комфорт', count: 2 },
  { id: 'crossover', label: 'Кроссоверы 4WD', count: 2 },
  { id: 'business', label: 'Бизнес & Премиум', count: 2 }
];

export const EXTRA_OPTIONS = [
  {
    id: 'airport_delivery',
    label: 'Подача / возврат в аэропорт',
    price: 8250,
    type: 'fixed',
    description: 'Встретим с табличкой у терминала 24/7'
  },
  {
    id: 'station_delivery',
    label: 'Подача на ж/д вокзал',
    price: 5500,
    type: 'fixed',
    description: 'Подача ко времени прибытия поезда'
  },
  {
    id: 'child_seat',
    label: 'Детское кресло (Isofix / бустер)',
    price: 1650,
    type: 'per_day',
    maxPrice: 9900,
    description: 'По возрасту и весу вашего ребенка'
  },
  {
    id: 'second_driver',
    label: 'Второй водитель в договоре',
    price: 2750,
    type: 'fixed',
    description: 'Официальное оформление двоих водителей'
  },
  {
    id: 'full_casco',
    label: 'Пакет "КАСКО без франшизы"',
    price: 3300,
    type: 'per_day',
    reducesDeposit: true,
    description: 'Снижает залог до 0 ₸ и снимает ответственность за мелкие повреждения'
  }
];

export const FAQ_DATA = [
  {
    question: 'Какие документы нужны для оформления аренды?',
    answer: 'Для граждан РК необходим паспорт или удостоверение личности, а также действующее водительское удостоверение категории «B». Для иностранных граждан — паспорт, миграционная карта (при необходимости) и международное ВУ.'
  },
  {
    question: 'Каковы требования к возрасту и стажу водителя?',
    answer: 'Минимальный возраст — от 21 года, стаж вождения — от 2 лет (для классов Эконом и Комфорт). Для бизнес-класса и премиум кроссоверов — от 23 лет и стаж от 3 лет.'
  },
  {
    question: 'Как и когда возвращается гарантийный залог?',
    answer: 'Залог вносится при подписании договора (переводом или наличными) и возвращается в полном объеме при сдаче чистого и исправного автомобиля. При подключении пакета «КАСКО без франшизы» залог составляет 0 ₸.'
  },
  {
    question: 'Есть ли ограничение по суточному пробегу?',
    answer: 'В тариф включен лимит 250 км в сутки, который суммируется на весь срок аренды (например, на 4 дня лимит равен 1000 км). Перепробег оплачивается по тарифу от 45 до 85 ₸/км в зависимости от класса, либо можно подключить опцию «Безлимитный пробег».'
  },
  {
    question: 'Можно ли выезжать за пределы Алматы?',
    answer: 'Да, поездки по Алматинской области и всему Казахстану разрешены. Пожалуйста, предупредите менеджера при бронировании для внесения отметки в договор. Выезд в труднодоступные горные локации согласовывается индивидуально.'
  },
  {
    question: 'В каком состоянии выдается автомобиль?',
    answer: 'Автомобиль передается клиенту идеально чистым после комплексной мойки и с полным баком топлива. Возврат осуществляется также с полным баком и в чистом виде (или оплачивается мойка).'
  }
];

export const REVIEWS_DATA = [
  {
    name: 'Алексей Смирнов',
    city: 'Алматы',
    car: 'Geely Monjaro 2024',
    rating: 5,
    date: '2 дня назад',
    text: 'Брали машину на выходные, чтобы съездить на Чарын и Кольсай. Monjaro отлично себя показал на трассе. Выдали быстро, салон чистый, пахнет новой машиной. Залог вернули на каспи без лишних вопросов.'
  },
  {
    name: 'Дана Ахметова',
    city: 'Астана',
    car: 'Skoda Octavia A8',
    rating: 5,
    date: '1 неделю назад',
    text: 'Прилетала в Алматы по работе, заказала подачу прямо в аэропорт. Водитель ждал у терминала, оформление заняло минут пять. Машина свежая, экономичная, в пробках на Аль-Фараби спасал климат-контроль.'
  },
  {
    name: 'Тимур Искаков',
    city: 'Шымкент',
    car: 'Kia K5 GT-Line',
    rating: 5,
    date: '2 недели назад',
    text: 'Нужна была презентабельная машина для встреч с партнерами. K5 выглядит шикарно. Сервис на уровне, ребята всегда на связи в ватсапе. Цены адекватные для такого состояния авто.'
  }
];

export function getDailyRate(car, days) {
  const base = car.pricing.tier1_2 || 0;
  if (days >= 30) return Math.round(base * 0.70);
  if (days >= 14) return Math.round(base * 0.80);
  if (days >= 7)  return Math.round(base * 0.85);
  if (days >= 3)  return Math.round(base * 0.90);
  return base;
}
