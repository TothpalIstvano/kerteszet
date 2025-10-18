export const blogPosts = [
  {
    id: 1,
    title: "Tavaszi minták: Készítsd el a legszebb virágos kendőt",
    excerpt: "Ebben a cikkben megmutatom, hogyan készíthetsz el egy gyönyörű virágos kendőt egyszerű technikákkal. Tökéletes kezdőknek és haladóknak egyaránt.",
    content: "Ebben a cikkben megmutatom, hogyan készíthetsz el egy gyönyörű virágos kendőt egyszerű technikákkal. Tökéletes kezdőknek és haladóknak egyaránt. A tavaszi időszak tökéletes alkalom arra, hogy új projektekbe vágjunk bele...",
    author: "Kovács Mária",
    date: "2024.03.15",
    readTime: "5 perc",
    likes: 42,
    comments: 8,
    tags: ["Kötés", "Tavaszi"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Horgolási alapok: Lépésről lépésre a láncolásig",
    excerpt: "Kezdő útmutató a horgoláshoz. Megtanulhatod az alapvető technikákat, amelyekkel bármilyen mintát elkészíthetsz.",
    content: "Kezdő útmutató a horgoláshoz. Megtanulhatod az alapvető technikákat, amelyekkel bármilyen mintát elkészíthetsz. A horgolás egy csodálatos hobbi, amely nemcsak relaxáló, hanem praktikus is...",
    author: "Nagy Anna",
    date: "2024.03.12",
    readTime: "8 perc",
    likes: 38,
    comments: 12,
    tags: ["Horgolás", "Kezdő"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Őszi dekoráció: Természetes anyagokból",
    excerpt: "Fedezd fel, hogyan készíthetsz gyönyörű őszi dekorációkat természetes anyagokból. Egyszerű, de látványos projektek.",
    content: "Fedezd fel, hogyan készíthetsz gyönyörű őszi dekorációt természetes anyagokból. Az ősz csodálatos lehetőségeket kínál a kreatív projektekhez...",
    author: "Szabó Péter",
    date: "2024.03.10",
    readTime: "6 perc",
    likes: 29,
    comments: 5,
    tags: ["Dekoráció", "Őszi", "DIY"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Kötött pulóver kezdőknek: Alapminták",
    excerpt: "Tanuld meg a kötés alapjait és készítsd el első pulóveredet. Részletes útmutató minden lépéshez.",
    content: "Tanuld meg a kötés alapjait és készítsd el első pulóveredet. A kötés egy időtlen kézműves technika, amely nemcsak hasznos, hanem rendkívül megnyugtató is...",
    author: "Tóth Eszter",
    date: "2024.03.08",
    readTime: "12 perc",
    likes: 56,
    comments: 18,
    tags: ["Kötés", "Kezdő", "Pulóver"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "Makramé fali díszek: Modern otthonokba",
    excerpt: "Készíts egyedi makramé fali díszeket modern otthonodba. Egyszerű technikák, látványos eredmények.",
    content: "Készíts egyedi makramé fali díszeket modern otthonodba. A makramé egy ősi csomózási technika, amely újra népszerű lett a modern lakberendezésben...",
    author: "Varga Kata",
    date: "2024.03.05",
    readTime: "9 perc",
    likes: 34,
    comments: 7,
    tags: ["Makramé", "Dekoráció", "Modern"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    title: "Hímzés alapjai: Első lépések",
    excerpt: "Ismerkedj meg a hímzés csodálatos világával. Alapvető öltések és technikák kezdőknek.",
    content: "Ismerkedj meg a hímzés csodálatos világával. A hímzés egy gyönyörű kézműves technika, amely lehetővé teszi, hogy egyedi alkotásokat készíts...",
    author: "Kiss Judit",
    date: "2024.03.02",
    readTime: "7 perc",
    likes: 41,
    comments: 9,
    tags: ["Hímzés", "Kezdő", "Kézművesség"],
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
  }
]

export const getAllTags = () => {
  const tags = new Set()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}