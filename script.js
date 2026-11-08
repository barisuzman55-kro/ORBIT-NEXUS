console.log("ORBIT NEXUS online!"); // Programın çalıştığını konsolda gösterir
import * as THREE from "three"; // Three.js araçlarını THREE adıyla kullanıma alır
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"; // Görüntü efektlerini sırayla uygular
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"; // Sahneyi ve kamerayı ilk olarak çizer
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"; // Parlak alanların çevresine hale ekler
const scene = new THREE.Scene(); // 3D nesnelerin bulunacağı sahne
const sceneContainer = document.getElementById("threeScene"); // HTML'deki sahne alanını bulur
const camera = new THREE.PerspectiveCamera(75,sceneContainer.clientWidth/ sceneContainer.clientHeight, 0.1, 1000); // Perspektif kamera oluşturur
camera.position.z = 5; // Kamerayı sahnede biraz geri çeker
const renderer = new THREE.WebGLRenderer(); // WebGL ile sahneyi çizecek render cihazını oluşturur
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight); // Render cihazının boyutunu sahne alanına uyarlar
sceneContainer.appendChild(renderer.domElement);
const composer = new EffectComposer(renderer); // Render cihazını efekt uygulayabilen bir sisteme bağlar
composer.addPass(new RenderPass(scene, camera)); // Normal sahne çizimini efekt sırasına ekler
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(sceneContainer.clientWidth, sceneContainer.clientHeight), // Bloom efektinin çözünürlüğünü belirler
    1.5, // Hale parlaklığını ayarlar
    0.4, // Halenin yayılma miktarını ayarlar
    0.6 // Bu parlaklığın üstündeki piksellere bloom uygular
);
composer.addPass(bloomPass); // Bloom efektini çizim sırasına ekler
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Küre geometrisini oluşturur
const textureLoader = new THREE.TextureLoader(); // Görsel dosyalarını Three.js dokusuna dönüştürür
const earthTexture = textureLoader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"); // Düz Dünya haritasını yükler
earthTexture.colorSpace = THREE.SRGBColorSpace; // Görsel renklerinin doğru yorumlanmasını sağlar
const sphereMaterial = new THREE.MeshStandardMaterial({ map: earthTexture }); // Yeşil renk yerine haritayı küreye kaplar
const sunLight=new THREE.PointLight(0xffffff, 30); // Beyaz ışık kaynağı oluşturur
scene.add(sunLight); // Işık kaynağını sahneye ekler
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // Geometri ve malzemeyi birleştirerek küreyi oluşturur
sphere.position.x=3; // Küreyi sahnede biraz sağa kaydırır
const sungeometry = new THREE.SphereGeometry(0.5, 32, 32); // Küçük bir küre geometrisi oluşturur
const sunmaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xff8800, emissiveIntensity: 4 }); // Güneşin yüzey rengini ve kendi ışık gücünü belirler
const sun = new THREE.Mesh(sungeometry, sunmaterial); // Geometri ve malzemeyi birleştirerek güneşi oluşturur
scene.add(sun); // Güneşi sahneye ekler
const starsGeometry = new THREE.BufferGeometry(); // Yıldızlar için boş bir geometri oluşturur
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }); // Yıldızlar için beyaz ve küçük bir malzeme oluşturur
const starVertices = []; // Yıldızların konumlarını saklayacak dizi
for (let i = 0; i < 1000; i++) { // 1000 yıldız oluşturmak için döngü
    const x = (Math.random() - 0.5) * 200; // X koordinatını rastgele belirler
    const y = (Math.random() - 0.5) * 200; // Y koordinatını rastgele belirler
    const z = (Math.random() - 0.5) * 200; // Z koordinatını rastgele belirler
    starVertices.push(x, y, z); // Koordinatları diziye ekler
}
starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3)); // Yıldızların konumlarını geometriye uygular
const stars = new THREE.Points(starsGeometry, starsMaterial); // Yıldızları oluşturur
scene.add(stars); // Yıldızları sahneye ekler
scene.add(sphere); // Küreyi sahneye ekler
function animate() { // Animasyon fonksiyonunu tanımlar
    requestAnimationFrame(animate);
    sphere.rotation.y+= 0.01; // Küreyi y ekseninde döndürür
    composer.render(); // Sahneyi çizip Bloom dahil efektleri uygular
}
animate(); // Animasyon fonksiyonunu başlatır


// 1. JavaScript alıştırmaları
const starname = "sun"; // Değişmeyecek yıldız adını saklar
console.log(starname); // Yıldız adını konsola yazar

let planetspeed = 15; // Sonradan değiştirilebilen gezegen hızını başlatır
planetspeed = 30; // Hızın değerini 30 olarak günceller
console.log(planetspeed); // Güncel hızı konsola yazar

const planetname = "earth"; // Gezegen adını metin olarak saklar
let planetdistance = 150; // Gezegen uzaklığını sayı olarak saklar
const isHabitable = true; // Gezegenin yaşama uygun olup olmadığını belirtir
console.log(typeof planetname, typeof planetdistance, typeof isHabitable); // Değerlerin türlerini konsola yazar

let planetDistance = 150; // Koşul denemesi için uzaklık değeri belirler
if (planetDistance > 100) { // Uzaklık 100'den büyük mü diye kontrol eder
    console.log("Far planet"); // Koşul doğruysa bunu yazar
} else { // Koşul doğru değilse bu bloğa girer
    console.log("Near planet"); // Gezegenin yakın olduğunu yazar
}

let marsDistance = 80; // Mars için uzaklık değeri belirler
if (marsDistance > 100) { // Mars 100'den uzakta mı diye kontrol eder
    console.log("Far planet"); // Uzaksa bunu yazar
} else if (marsDistance === 100) { // Değer tam 100 mü diye kontrol eder
    console.log("Equal distance"); // Değer 100 ise bunu yazar
} else { // Önceki koşullar yanlışsa bu bloğa girer
    console.log("Near planet"); // Mars'ın yakın olduğunu yazar
}

function launchNexus() { // Başlatma mesajını yazacak fonksiyonu tanımlar
    console.log("NEXUS SYSTEM LAUNCH INITIATED"); // Başlatma mesajını konsola yazar
}
launchNexus(); // Fonksiyonu çalıştırır

function showplanet(planetname) { // Parametre olarak aldığı gezegen adını yazdırır
    console.log("Planet name is: " + planetname); // Metin ile gezegen adını birleştirip yazar
}
showplanet("Earth"); // Fonksiyonu Earth değeriyle çalıştırır
showplanet("Mars"); // Fonksiyonu Mars değeriyle çalıştırır
showplanet("Jupiter"); // Fonksiyonu Jupiter değeriyle çalıştırır

function showplanetinfo(planetname, planetdistance) { // Gezegen adı ve uzaklığını alan fonksiyonu tanımlar
    console.log("Planet name is: " + planetname + " and distance is: " + planetdistance); // İki bilgiyi birleştirip konsola yazar
}
showplanetinfo("Earth", 150); // Dünya bilgilerini fonksiyona gönderir
showplanetinfo("Mars", 80); // Mars bilgilerini fonksiyona gönderir
showplanetinfo("Jupiter", 600); // Jupiter bilgilerini fonksiyona gönderir

// 2. Gezegen verileri
const earth = {
    name: "Earth", // Gezegenin adını saklar
    distance: 150, // Sıralama için uzaklık değerini saklar
    color: "gold", // Bilgi alanında kullanılacak rengi saklar
    image: "İmages/Uzaydan Görülen Dünya.PNG", // Gezegen görselinin dosya yolunu saklar
    description: "Earth is our home planet. It is the only known planet to support life." // Gezegen açıklamasını saklar
};

const mars = {
    name: "Mars", // Gezegenin adını saklar
    distance: 80, // Sıralama için uzaklık değerini saklar
    color: "red", // Bilgi alanında kullanılacak rengi saklar
    image: "İmages/Mars.PNG", // Gezegen görselinin dosya yolunu saklar
    description: "Mars is the fourth planet from the Sun. It is known as the Red Planet due to its reddish appearance caused by iron oxide on its surface." // Gezegen açıklamasını saklar
};

const jupiter = {
    name: "Jupiter", // Gezegenin adını saklar
    distance: 600, // Sıralama için uzaklık değerini saklar
    color: "orange", // Bilgi alanında kullanılacak rengi saklar
    image: "İmages/Jupiter.PNG", // Gezegen görselinin dosya yolunu saklar
    description: "Jupiter is the largest planet in our solar system. It is a gas giant with a thick atmosphere and is known for its Great Red Spot, a giant storm that has been raging for centuries." // Gezegen açıklamasını saklar
};

const planets = [earth, mars, jupiter]; // Üç gezegen nesnesini bir dizide toplar
planets.push({
    name: "Saturn", // Eklenecek gezegenin adını saklar
    distance: 1200, // Eklenecek gezegenin uzaklığını saklar
    color: "yellow", // Eklenecek gezegenin rengini saklar
    image: "İmages/Saturn.PNG", // Eklenecek gezegenin görsel yolunu saklar
    description: "Saturn is the sixth planet from the Sun and is known for its stunning ring system. It is a gas giant with a low density and is primarily composed of hydrogen and helium." // Eklenecek gezegenin açıklamasını saklar
});
planets.push({
    name: "Venus", // Eklenecek gezegenin adını saklar
    distance: 70, // Eklenecek gezegenin uzaklığını saklar
    color: "green", // Eklenecek gezegenin rengini saklar
    image: "İmages/Venus.jpg", // Eklenecek gezegenin görsel yolunu saklar
    description: "Venus is the second planet from the Sun and is often referred to as Earth's sister planet due to its similar size and composition. It has a thick atmosphere that traps heat, making it the hottest planet in our solar system." // Eklenecek gezegenin açıklamasını saklar
});
planets.push({
    name: "Mercury", // Eklenecek gezegenin adını saklar
    distance: 50, // Eklenecek gezegenin uzaklığını saklar
    color: "gray", // Eklenecek gezegenin rengini saklar
    image: "İmages/Mercury.jpg", // Eklenecek gezegenin görsel yolunu saklar
    description: "Mercury is the smallest planet in our solar system and the closest to the Sun. It has a thin atmosphere and a heavily cratered surface." // Eklenecek gezegenin açıklamasını saklar
});
planets.push({
    name: "Neptune", // Eklenecek gezegenin adını saklar
    distance: 3000, // Eklenecek gezegenin uzaklığını saklar
    color: "blue", // Eklenecek gezegenin rengini saklar
    image: "İmages/Neptune.PNG", // Eklenecek gezegenin görsel yolunu saklar
    description: "Neptune is the eighth planet from the Sun and the farthest known planet in our solar system. It is a gas giant with a deep blue color and a strong magnetic field." // Eklenecek gezegenin açıklamasını saklar
});
planets.push({
    name: "Uranus", // Eklenecek gezegenin adını saklar
    distance: 2000, // Eklenecek gezegenin uzaklığını saklar
    color: "lightblue", // Eklenecek gezegenin rengini saklar
    image: "İmages/Uranus.PNG", // Eklenecek gezegenin görsel yolunu saklar
    description: "Uranus is the seventh planet from the Sun and is known for its unique sideways rotation. It is a gas giant with a pale blue color and a complex ring system." // Eklenecek gezegenin açıklamasını saklar
});

// 3. JavaScript'in kullanacağı HTML öğeleri
const exploreButton = document.getElementById("exploreButton"); // HTML'deki Dünya butonunu bulur
const marsButton = document.getElementById("marsButton"); // HTML'deki Mars butonunu bulur
const jupiterButton = document.getElementById("jupiterButton"); // HTML'deki Jupiter butonunu bulur
const planetInfo = document.getElementById("planetInfo"); // Gezegen bilgilerinin yazılacağı alanı bulur
const planetContainer = document.getElementById("planetContainer"); // Gezegen kartlarının ekleneceği alanı bulur
let selectedPlanet = null; // Son tıklanan gezegeni saklar; başlangıçta henüz seçim yoktur

// 4. Seçilen gezegenin bilgilerini göster
function showplanet8(planet) { // Verilen gezegenin bilgilerini sayfada gösterir
    planetInfo.textContent = "planet:" + planet.name + "\n" + "distance: " + planet.distance + "\n" + "description: " + planet.description; // Bilgileri satır sonlarıyla birleştirip alana yazar
    planetInfo.style.color = planet.color; // Bilgi yazısının rengini gezegene göre değiştirir
    planetInfo.style.whiteSpace = "pre-line"; // Metindeki satır sonlarını ekranda gösterir
}

// 5. Buton tıklama işlemleri
exploreButton.addEventListener("click", function() { // Dünya butonuna tıklanınca çalışacak kodu ayarlar
    showplanet8(earth); // Dünya bilgilerini gösterir
});
marsButton.addEventListener("click", function() { // Mars butonuna tıklanınca çalışacak kodu ayarlar
    showplanet8(mars); // Mars bilgilerini gösterir
});
jupiterButton.addEventListener("click", function() { // Jupiter butonuna tıklanınca çalışacak kodu ayarlar
    showplanet8(jupiter); // Jupiter bilgilerini gösterir
});

// 6. Gezegenleri sırala ve bilgilerini konsola yazdır
planets.sort((a, b) => a.distance - b.distance); // Diziyi uzaklık değerine göre küçükten büyüğe sıralar
for (const planet of planets) { // Dizideki her gezegeni sırayla ele alır
    console.log("Planet: " + planet.name + ", Distance: " + planet.distance + ", Color: " + planet.color); // Gezegen bilgilerini konsola yazar
}
// 7. Her gezegen için kart oluştur
for (const planet of planets) { // Her gezegen için aşağıdaki işlemleri tekrarlar
    const planetCard = document.createElement("article"); // Yeni bir HTML article öğesi oluşturur
    planetCard.classList.add("card"); // Karta CSS'teki card görünümünü verir
    planetCard.dataset.planet = planet.name.toLowerCase(); // Kartın data-planet özelliğine gezegen adını küçük harfle kaydeder

    const planetTitle = document.createElement("h3"); // Kart başlığı için h3 öğesi oluşturur
    planetTitle.textContent = planet.name; // Başlığa gezegenin adını yazar

    const planetImage = document.createElement("img"); // Kart görseli için img öğesi oluşturur
    planetImage.src = planet.image; // Görsel dosyasının yolunu belirler
    planetImage.alt = planet.name + " planet"; // Görsel açılamazsa kullanılacak metni belirler
    planetImage.loading = "lazy"; // Ekrana yaklaşana kadar görselin yüklenmesini erteler
    planetImage.classList.add("planet-image"); // Görsele CSS'teki boyut ve kırpma kurallarını uygular

    const planetDescription = document.createElement("p"); // Açıklama için paragraf öğesi oluşturur
    planetDescription.textContent = planet.description; // Paragrafa gezegen açıklamasını yazar

    planetCard.appendChild(planetTitle); // Başlığı kartın içine ekler
    planetCard.appendChild(planetImage); // Görseli kartın içine ekler
    planetCard.appendChild(planetDescription); // Açıklamayı kartın içine ekler
 
    planetCard.addEventListener("click" , function() { // Karta tıklanınca çalışacak kodu ayarlar
        
        for (const card of planetContainer.children) { // Tüm gezegen kartlarını sırayla kontrol eder
            card.classList.remove("selected"); // Önceki seçim işaretini kaldırır
        }
        planetCard.classList.add("selected"); // Tıklanan karta seçili görünümünü verir
        selectedPlanet = planets.find(function(candidatePlanet) { // Kartla eşleşen gezegeni bulup ortak değişkene kaydeder
            return candidatePlanet.name.toLowerCase() === planetCard.dataset.planet; // Gezegen adını karttaki data-planet ile karşılaştırır
        }); // Bulunan gezegen nesnesini selectedPlanet değişkenine atar
        showplanet8(selectedPlanet); // Bulunan gezegenin bilgilerini gösterir
    }); // Kartın tıklama olayını kapatır
    planetCard.addEventListener("mouseenter", function() {
        planetInfo.textContent = "Hovering over: " + planet.name; // Kartın üzerine gelince gezegen adını gösterir
        planetInfo.style.color = planet.color; // Önizleme yazısının rengini gezegene göre ayarlar

    }); // Kartın üzerine gelince çalışacak kodu ayarlar
    planetCard.addEventListener("mouseleave", function() {
        if (selectedPlanet) { // Daha önce bir gezegen seçildiyse
            showplanet8(selectedPlanet); // Seçili gezegenin tam bilgilerini geri gösterir
        } else { // Henüz gezegen seçilmediyse
            planetInfo.textContent = "Planet information will appear"; // Başlangıç mesajını geri gösterir
            planetInfo.style.color = ""; // Yazı rengini sayfanın varsayılan rengine döndürür
        }
    }); // Kartın üzerinden çıkınca çalışacak kodu ayarlar
    planetContainer.appendChild(planetCard); // Tamamlanan kartı sayfadaki kart alanına ekler
}
