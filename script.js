const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = Date.now();
    if (now - prev > delay) {
      prev = now;
      func(...args);
    }
  };
};

const centerDiv = document.querySelector("#center");

const images = [
  "https://images.unsplash.com/photo-1600812898697-679d14c1ad7d?w=600",
  "https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600",
  "https://images.unsplash.com/photo-1558769132-cb1aea1f9565?w=600",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
];

centerDiv.addEventListener(
  "mousemove",
  throttleFunction((dets) => {
    const rect = centerDiv.getBoundingClientRect();
    const x = dets.clientX - rect.left;
    const y = dets.clientY - rect.top;

    // ✅ image pehle load hogi
    const img = new Image();
    img.src = images[Math.floor(Math.random() * images.length)];

    img.onload = () => {
      // ✅ div ONLY after image loaded
      const div = document.createElement("div");
      div.classList.add("imagediv");
      div.style.left = x + "px";
      div.style.top = y + "px";

      div.appendChild(img);
      centerDiv.appendChild(div);

      // animation
      gsap.fromTo(
        img,
        { y: "100%" },
        { y: "0%", duration: 0.4, ease: Power1.easeOut }
      );

      gsap.to(img, {
        y: "-100%",
        delay: 0.5,
        duration: 1,
        ease: Power2.easeIn,
      });

      setTimeout(() => {
        div.remove();
      }, 1500);
    };

    // ❌ agar image fail ho → kuch bhi mat banao
    img.onerror = () => {};
  }, 400)
);
