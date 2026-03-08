import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const photos = [
  { src: "/images/gallery-coding.jpg", alt: "Late night coding session", caption: "Late Night Coding" },
  { src: "/images/gallery-robotics.jpg", alt: "Robotics workshop", caption: "Robotics Workshop" },
  { src: "/images/gallery-math.jpg", alt: "Mathematics study", caption: "Math Deep Dive" },
  { src: "/images/gallery-university.jpg", alt: "University campus", caption: "ELTE Budapest" },
  { src: "/images/gallery-ai.jpg", alt: "Neural network visualization", caption: "AI & Neural Networks" },
  { src: "/images/gallery-awards.jpg", alt: "Award ceremony", caption: "Competition Awards" },
];

const PhotoGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const columns = [
    { photos: photos.slice(0, 2), y: y1 },
    { photos: photos.slice(2, 4), y: y2 },
    { photos: photos.slice(4, 6), y: y3 },
  ];

  return (
    <section className="py-24 px-6 relative" ref={containerRef}>
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <motion.span
            className="font-mono-label text-primary mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            GALLERY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Moments
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col, colIdx) => (
            <motion.div key={colIdx} style={{ y: col.y }} className="space-y-6">
              {col.photos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass-card overflow-hidden group relative"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="font-mono-label text-primary-foreground text-xs">{photo.caption}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
