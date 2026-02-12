import solarVideo from "@/assets/solar-energy-video.mp4";

const SolarAnimationSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <video
        src={solarVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto block"
        style={{ maxHeight: "100vh", objectFit: "cover" }}
      />
    </section>
  );
};

export default SolarAnimationSection;
