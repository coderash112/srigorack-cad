import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Lightbox from "../components/Lightbox";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DesignsPage = () => {
  const [allImages, setAllImages] = useState([]);
  const [cadImages, setCadImages] = useState([]);
  const [renderImages, setRenderImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      const images = response.data;
      setAllImages(images);
      setCadImages(images.filter((img) => img.category === "cad"));
      setRenderImages(images.filter((img) => img.category === "rendering"));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const getCurrentImages = () => {
    switch (activeTab) {
      case "cad":
        return cadImages;
      case "rendering":
        return renderImages;
      default:
        return allImages;
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-500 pt-32" data-testid="designs-page">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Our Portfolio
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-6" data-testid="designs-title">
              Design Gallery
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our collection of precision CAD models and photorealistic
              renderings crafted for the jewelry industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <TabsList className="bg-obsidian-400/50 border border-white/10 p-1 rounded-lg" data-testid="gallery-tabs">
                <TabsTrigger
                  value="all"
                  className="px-6 py-3 text-sm uppercase tracking-widest data-[state=active]:bg-gold-400 data-[state=active]:text-black rounded-md transition-all"
                  data-testid="tab-all"
                >
                  All Designs
                </TabsTrigger>
                <TabsTrigger
                  value="cad"
                  className="px-6 py-3 text-sm uppercase tracking-widest data-[state=active]:bg-gold-400 data-[state=active]:text-black rounded-md transition-all"
                  data-testid="tab-cad"
                >
                  CAD Designs
                </TabsTrigger>
                <TabsTrigger
                  value="rendering"
                  className="px-6 py-3 text-sm uppercase tracking-widest data-[state=active]:bg-gold-400 data-[state=active]:text-black rounded-md transition-all"
                  data-testid="tab-rendering"
                >
                  Renderings
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="all" className="mt-0">
              <GalleryGrid
                images={allImages}
                onImageClick={openLightbox}
              />
            </TabsContent>

            <TabsContent value="cad" className="mt-0">
              <GalleryGrid
                images={cadImages}
                onImageClick={openLightbox}
              />
            </TabsContent>

            <TabsContent value="rendering" className="mt-0">
              <GalleryGrid
                images={renderImages}
                onImageClick={openLightbox}
              />
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {getCurrentImages().length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No designs available in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-obsidian-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Like What You See?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Let us create stunning CAD designs and renderings for your jewelry
              collection.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-8 py-5 rounded-sm transition-all duration-300 btn-shine"
              data-testid="designs-cta"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={getCurrentImages()}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </div>
  );
};

const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative aspect-[4/3] overflow-hidden cursor-pointer rounded-lg image-zoom gold-border-glow"
          onClick={() => onImageClick(index)}
          data-testid={`design-item-${index}`}
        >
          <img
            src={image.image_url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-gold-400 text-xs uppercase tracking-widest mb-2 block">
                {image.category}
              </span>
              <h3 className="font-heading text-xl text-white">{image.title}</h3>
              {image.description && (
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesignsPage;
