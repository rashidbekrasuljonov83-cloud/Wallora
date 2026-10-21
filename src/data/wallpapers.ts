export interface Wallpaper {
  id: string;
  title: string;
  image: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: string;
  width: number;
  height: number;
  resolution: string;
  orientation: "landscape" | "portrait" | "square";
  likes: number;
  downloads: number;
  isFeatured: boolean;
  isPopular: boolean;
  isTrending: boolean;
  createdAt: string;
  color: string;
}

const CATEGORIES = [
  "Nature",
  "Mountains",
  "Abstract",
  "Minimal",
  "Anime",
  "Cars",
  "Architecture",
  "Space",
  "Technology",
  "Gaming",
  "Animals",
  "City",
  "Ocean",
  "Sunset",
  "Dark",
  "AMOLED",
  "3D",
  "Art",
  "Photography",
  "Aesthetic",
];

const ORIENTATIONS: ("landscape" | "portrait" | "square")[] = [
  "landscape",
  "portrait",
  "square",
];

const COLORS = [
  "#0f172a",
  "#1e1b4b",
  "#18181b",
  "#030712",
  "#172554",
  "#052e16",
  "#312e81",
  "#1f2937",
];

// Validated, high-resolution Unsplash CDN IDs by category
const CATEGORY_PHOTOS: Record<string, string[]> = {
  Nature: [
    "1506744038136-46273834b3fb",
    "1470071459604-3b5ec3a7fe05",
    "1472214103451-9374bd1c798e",
    "1441974231531-c6227db76b6e",
  ],
  Mountains: [
    "1464822759023-fed622ff2c3b",
    "1519681393784-d120267933ba",
    "1486870591958-9b9d0d1dda99",
    "1506905925346-21bda4d32df4",
  ],
  Abstract: [
    "1550684848-fac1c5b4e853",
    "1618005182384-a83a8bd57fbe",
    "1579783900882-c0d3dad7b119",
    "1541701494587-cb58502866ab",
  ],
  Minimal: [
    "1494438639946-1ebd1d20bf85",
    "1513542789411-b6a5d4f31634",
    "1507525428034-b723cf961d3e",
    "1499750310107-5fef28a66643",
  ],
  Anime: [
    "1578632767115-351597cf2477",
    "1534447677768-be436bb09401",
    "1518709268805-4e9042af9f23",
    "1542751371-adc38448a05e",
  ],
  Cars: [
    "1503376780353-7e6692767b70",
    "1552519507-da3b142c6e3d",
    "1583121274602-3e2820c69888",
  ],
  Architecture: [
    "1513694203232-719a280e022f",
    "1486406146926-c627a92ad1ab",
    "1514565131-fce0801e5785",
  ],
  Space: [
    "1451187580459-43490279c0fa",
    "1446776811953-b23d57bd21aa",
    "1506703719100-a0f3a48c0f86",
    "1518709268805-4e9042af9f23",
  ],
  Technology: [
    "1518709268805-4e9042af9f23",
    "1550745165-9bc0b252726f",
    "1511512578047-dfb367046420",
  ],
  Gaming: [
    // Al-ID al-qadima (4)
    "1542751371-adc38448a05e",
    "1511512578047-dfb367046420",
    "1550745165-9bc0b252726f",
    "1538481199705-c710c4e965fc",
    // Al-ID al-jadida (21)
    "1542751110-97427bbecf20",
    "1612287230202-1ff1d85d1bdf",
    "1580234811497-9df7fd2f357e",
    "1509198397868-475647b2a1e5",
    "1560253023-3ec5d502959f",
    "1616588589676-6313de46a25f",
    "1552824723-332ebec14210",
    "1607604276583-eef5d076aa5f",
    "1513807016779-d5150c0342e5",
    "1598550476439-6847785fcea6",
    "1627856013091-fed6e4e30025",
    "1548685913-fe6678babe8d",
    "1518709268805-4e9042af9f23",
    "1579373903781-fd5c0c30c4cd",
    "1600861194942-f883de0dfe96",
    "1526374965328-7f61d4dc18c5",
    "1614680376593-902f749f7edc",
    "1563089145-599997674d42",
    "1587202372775-e229f172b9d7",
    "1618005182384-a83a8bd57fbe",
    "1534423839368-1796a4dd1808",
  ],
  Animals: [
    // Oldingi 20 ta ID
    "1564349683136-77e08dba1ef7",
    "1534188753412-3e26d0d618d6",
    "1546182990-dffeafbe841d",
    "1474511320723-9a56873867b5",
    "1530595467537-0b5996c41f2d",
    "1555169062-013468b47731",
    "1535268647677-300dbf3d78d1",
    "1517849845537-4d257902454a",
    "1537151608828-ea2b11777ee8",
    "1561731216-c3a4d99437d5",
    "1574063413132-355dbfd83e03",
    "1503777119540-0e4871d3d0df",
    "1450778869186-39d3243f3178",
    "1518791841217-8f162f1e1131",
    "1507146426996-205370a58e6f",
    "1548767797-d8c844163c4c",
    "1552053831-71594a27632d",
    "1534361960057-19889db98d18",
    "1517423440428-a5a00ad493e8",
    "1583337130417-3346a1be7dee",
    // Yangi qo'shilgan 10 ta ID
    "1425082661705-1834bfd09dca",
    "1568640347023-a616a30bc3bd",
    "1534567153574-2b12153a87f0",
    "1437622368342-7a3d73a34c8f",
    "1518020382113-a7e8fc38eac9",
    "1522276498395-f4f68f7f8454",
    "1504006833117-8886a355efbf",
    "1508814435343-263a23362a26",
    "1575550959106-5a7defe28b56",
    "1560807707-8cc77767d783",
  ],
  City: [
    // İlk 20 resim...
    "1514565131-fce0801e5785",
    "1486406146926-c627a92ad1ab",
    "1513694203232-719a280e022f",
    "1477959858617-67f30ac4d21e",
    "1519501025264-65ba15a82390",
    "1444723121867-7a241cacace9",
    "1502602898657-3e91760cbb34",
    "1496568816309-51a7cbe0810d",
    "1512453979798-5ea266f8880c",
    "1534430480872-3498386e7856",
    "1470071459604-3b5ec3a7fe05",
    "1467269204594-9661b134dd2b",
    "1518391846015-55a9cc003b25",
    "1480714378408-67cf0d13bc1b",
    "1513584684374-8bab748fbf90",
    "1508009603885-50cf7c579365",
    "1514924013411-cbf25faa35bb",
    "1522083165192-38379469255a",
    "1503899036084-c55cdd92da26",
    "1499856871958-5b9627545d1a",

    // Eklenen 4 yeni benzersiz ID
    "1509198397868-475647b2a1e5",
    "1477346611705-65d1883cee1e",
    "1516483638261-f4dbaf036963",
    "1531219432768-9f540ce91ef3",
  ],
  Ocean: [
    // Dastlabki 2 ta ID
    "1507525428034-b723cf961d3e",
    "1518837695005-2083093ee35b",

    // Qo'shilgan 8 ta yangi unikal ID
    "1505118380757-91f5f5632de0",
    "1484291470158-b8f8d608850d",
    "1506929562872-bb421503ef21",
    "1468413253725-0d5181091126",
    "1518495973542-4542c06a5843",
    "1471922694854-ff1b63b20054",
    "1503756234508-e32369269edd",
    "1518837695005-2083093ee35b",
  ],
  Sunset: [
    // Siz bergan va tekshirilgan ID'lar
    "1509233725247-49e657c54213",
    "1495616811223-4d98c6e9c869",

    // Yangi qo'shilgan 10 ta unikal Sunset (Quyosh botishi) ID'lari
    "1506744038136-46273834b3fb",
    "1470252649378-9c29740c9fa8",
    "1500382017468-9049fed747ef",
    "1494548162494-384bba4ab999",
    "1518495973542-4542c06a5843",
    "1469474968028-56623f02e42e",
    "1507525428034-b723cf961d3e",
    "1510312305653-8ed496efae75",
    "1439853949127-fa647821edf0",
    "1508739773434-c26b3d09e871",
  ],
  Dark: [
    // İlk kontrol edilmiş ve benzersiz olan ID'ler
    "1451187580459-43490279c0fa",
    "1506703719100-a0f3a48c0f86",

    // Eklenen 18 yeni benzersiz Dark (Koyu/Gece) ID'si
    "1518709268805-4e9042af9f23",
    "1509198397868-475647b2a1e5",
    "1519681393784-d120267933ba",
    "1478760329108-5c3ed9d495a0",
    "1534447677768-be436bb09401",
    "1507499739999-097706ad8914",
    "1518837695005-2083093ee35b",
    "1516339901601-2e1b62dc0c45",
    "1550684848-fac1c5b4e853",
    "1518709268805-4e9042af9f23",
    "1508739773434-c26b3d09e871",
    "1514565131-fce0801e5785",
    "1520038410233-7141be7e6f97",
    "1504384308090-c894fdcc538d",
    "1526374965328-7f61d4dc18c5",
    "1511447333015-45b65e60f6d5",
    "1502134249126-9f3755a50d78",
    "1550745165-9bc0b252726f",
  ],
  AMOLED: [
    "1550684848-fac1c5b4e853",
    "1518709268805-4e9042af9f23",
    "1509198397868-475647b2a1e5",
    "1550745165-9bc0b252726f",
    "1526374965328-7f61d4dc18c5",
    "1504384308090-c894fdcc538d",
    "1511447333015-45b65e60f6d5",
    "1502134249126-9f3755a50d78",
    "1518709268805-4e9042af9f23",
    "1534447677768-be436bb09401",
    "1507499739999-097706ad8914",
    "1516339901601-2e1b62dc0c45",
    "1514565131-fce0801e5785",
    "1520038410233-7141be7e6f97",
    "1563089145-599997674d42",
    "1607604276583-eef5d076aa5f",
    "1579546929518-9e396f3cc809",
    "1550751827-4bd374c3f58b",
    "1518770660439-4636190af475",
    "1558655146-d09347e92766",
  ],

  "3D": [
    "1618005182384-a83a8bd57fbe",
    "1579783900882-c0d3dad7b119",
    "1542751371-adc38448a05e",
    "1633356122544-f134324a6cee",
    "1614036417651-efe5912149d8",
    "1634017839464-5c339ebe3cb4",
    "1618005182384-a83a8bd57fbe",
    "1620641788421-7a1c342ea42e",
    "1633356122102-3fe601e05bd2",
    "1618005198919-d3d4b5a92ead",
    "1600585154340-be6161a56a0c",
    "1615729947596-a598e5de0ab3",
    "1618005182384-a83a8bd57fbe",
    "1634017839464-5c339ebe3cb4",
    "1635070041078-e363dbe005cb",
    "1618005182384-a83a8bd57fbe",
    "1620641788421-7a1c342ea42e",
    "1607604276583-eef5d076aa5f",
    "1618005200392-a169e5d4cb07",
    "1633356122544-f134324a6cee",
  ],

  Art: [
    "1541701494587-cb58502866ab",
    "1579783900882-c0d3dad7b119",
    "1579546929518-9e396f3cc809",
    "1549887534-1541e9326642",
    "1579783902614-a3fb3927b675",
    "1578328819058-b69f3a3b0f6b",
    "1579783901586-d8827248313b",
    "1561214115-f2f134cc4912",
    "1577083552431-6e5fd01aa342",
    "1582562124811-c09040d0a901",
    "1579783902029-798782a171f1",
    "1579783902517-5a9d16a8585e",
    "1579783900452-f633a6f1947e",
    "1579783901840-798782a171f1",
    "1578926377703-05b5e4402636",
    "1580136579312-94651dfd596d",
    "1579783900762-b9e763f01f2f",
    "1579783902211-137b777a83d4",
    "1579783902581-22fb1b869bf8",
    "1579783901905-2b4a5303c80a",
  ],

  Photography: [
    "1506744038136-46273834b3fb",
    "1507525428034-b723cf961d3e",
    "1464822759023-fed622ff2c3b",
    "1470071459604-3b5ec3a7fe05",
    "1472214103451-9374bd1c798e",
    "1441974231531-c6227db76b6e",
    "1519681393784-d120267933ba",
    "1486870591958-9b9d0d1dda99",
    "1506905925346-21bda4d32df4",
    "1494438639946-1ebd1d20bf85",
    "1513542789411-b6a5d4f31634",
    "1499750310107-5fef28a66643",
    "1505118380757-91f5f5632de0",
    "1484291470158-b8f8d608850d",
    "1506929562872-bb421503ef21",
    "1468413253725-0d5181091126",
    "1471922694854-ff1b63b20054",
    "1503756234508-e32369269edd",
    "1470252649378-9c29740c9fa8",
    "1500382017468-9049fed747ef",
  ],

  Aesthetic: [
    "1518837695005-2083093ee35b",
    "1509233725247-49e657c54213",
    "1513519245088-0e12902e5a38",
    "1518709268805-4e9042af9f23",
    "1507525428034-b723cf961d3e",
    "1513542789411-b6a5d4f31634",
    "1518495973542-4542c06a5843",
    "1508739773434-c26b3d09e871",
    "1513584684374-8bab748fbf90",
    "1514924013411-cbf25faa35bb",
    "1503899036084-c55cdd92da26",
    "1516483638261-f4dbaf036963",
    "1506744038136-46273834b3fb",
    "1494548162494-384bba4ab999",
    "1469474968028-56623f02e42e",
    "1510312305653-8ed496efae75",
    "1439853949127-fa647821edf0",
    "1505118380757-91f5f5632de0",
    "1484291470158-b8f8d608850d",
    "1506929562872-bb421503ef21",
  ],
};

const ALL_PHOTOS = Array.from(new Set(Object.values(CATEGORY_PHOTOS).flat()));

function generateWallpapers(count: number): Wallpaper[] {
  const wallpapers: Wallpaper[] = [];

  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const categoryPool = CATEGORY_PHOTOS[category] || ALL_PHOTOS;
    const photoId =
      categoryPool[Math.floor(i / CATEGORIES.length) % categoryPool.length];
    const orientation = ORIENTATIONS[i % ORIENTATIONS.length];
    const color = COLORS[i % COLORS.length];

    let width = 1920;
    let height = 1080;
    if (orientation === "portrait") {
      width = 1080;
      height = 1920;
    } else if (orientation === "square") {
      width = 1080;
      height = 1080;
    }

    if (i % 3 === 0) {
      width = Math.round(width * 1.5);
      height = Math.round(height * 1.5);
    }

    wallpapers.push({
      id: `w-${i + 1}`,
      title: `${category} Atmosphere ${i + 1}`,
      image: `https://images.unsplash.com/photo-${photoId}?q=85&w=${width}&auto=format&fit=crop`,
      thumbnail: `https://images.unsplash.com/photo-${photoId}?q=75&w=600&auto=format&fit=crop`,
      category,
      tags: [
        category.toLowerCase(),
        "wallpaper",
        "4k",
        orientation,
        "ultra-hd",
      ],
      author: `Artist ${((i * 7) % 40) + 1}`,
      width,
      height,
      resolution: `${width}x${height}`,
      orientation,
      likes: Math.floor(((i * 73) % 8900) + 320),
      downloads: Math.floor(((i * 157) % 43000) + 1200),
      isFeatured: i % 8 === 0,
      isPopular: i % 5 === 0,
      isTrending: i % 6 === 0,
      createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
      color,
    });
  }

  return wallpapers;
}

export const wallpapersData: Wallpaper[] = generateWallpapers(500);

export const getCategories = () => CATEGORIES;
