import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Gem,
  Sparkles,
  Layers,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Zap,
  Award,
} from "lucide-react";
import { Button } from "../components/ui/button";
import Lightbox from "../components/Lightbox";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUpVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HomePage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const services = [
    {
      icon: Gem,
      title: "CAD Design",
      description:
        "Professional jewelry CAD modeling with manufacturing-ready precision files.",
      features: ["Manufacturing-ready files", "Precision engineering", "3D visualization"],
    },
    {
      icon: Sparkles,
      title: "Rendering Services",
      description:
        "Photorealistic diamond rendering with studio-quality visuals for catalogs.",
      features: ["Studio-quality visuals", "Marketing-ready images", "Multiple angles"],
    },
    {
      icon: Layers,
      title: "CAD + Rendering",
      description:
        "Complete design to visualization pipeline for jewelry manufacturers.",
      features: ["End-to-end workflow", "Consistent quality", "Faster delivery"],
    },
  ];

  const whyChooseUs = [
    { icon: Award, title: "Expert Designers", desc: "Experienced CAD jewelry specialists" },
    { icon: Clock, title: "Fast Turnaround", desc: "Quick delivery without compromise" },
    { icon: Zap, title: "Manufacturing Ready", desc: "Files ready for production" },
    { icon: Users, title: "Dedicated Team", desc: "Personal design support" },
  ];

  const pricingPreview = [
    {
      name: "Starter",
      price: "$799",
      period: "/month",
      highlight: false,
      features: ["35 CAD designs/month", "5 Renderings included", "Email support"],
    },
    {
      name: "Professional",
      price: "$1,299",
      period: "/month",
      highlight: true,
      features: ["60 CAD designs/month", "15 Renderings included", "Priority support"],
    },
    {
      name: "Enterprise",
      price: "$1,999",
      period: "/month",
      highlight: false,
      features: ["Unlimited CAD designs", "30 Renderings included", "Dedicated team"],
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-500" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2070&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian-500" />
        </div>

        {/* Gold Glow Effect */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[150px] animate-glow" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 pt-40">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.6 }}
              className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-6"
            >
              Premium CAD & Rendering
            </motion.p>

            <motion.h1
              variants={fadeUpVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-8 text-shadow"
              data-testid="hero-headline"
            >
              Precision Jewelry
              <span className="block gold-text">Design Services</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
              data-testid="hero-subheadline"
            >
              Helping jewelry manufacturers transform ideas into high precision
              CAD models and photorealistic renderings.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/designs">
                <Button
                  className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-8 py-6 rounded-sm btn-shine"
                  data-testid="hero-cta-designs"
                >
                  View Designs
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:border-gold-400 hover:text-gold-400 uppercase tracking-widest text-xs px-8 py-6 rounded-sm"
                  data-testid="hero-cta-pricing"
                >
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gold-400 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-obsidian-400" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-white">
              Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-obsidian-300/50 border border-white/5 p-8 hover:bg-obsidian-300 transition-all duration-500 card-hover"
                data-testid={`service-card-${index}`}
              >
                <div className="w-14 h-14 rounded-sm bg-gold-400/10 flex items-center justify-center mb-6 group-hover:bg-gold-400/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-heading text-2xl text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-obsidian-500" data-testid="why-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
                Why SriGoRack
              </p>
              <h2 className="font-heading text-3xl md:text-5xl text-white mb-6">
                Why Choose SriGoRack Technologies
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We combine engineering precision with artistic excellence to
                deliver jewelry designs that exceed expectations. Our team of
                experienced CAD specialists ensures every design is
                manufacturing-ready.
              </p>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:border-gold-400 hover:text-gold-400 uppercase tracking-widest text-xs px-6 py-5 rounded-sm"
                  data-testid="why-cta"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-obsidian-400/50 border border-white/5 p-6 card-hover"
                  data-testid={`why-card-${index}`}
                >
                  <item.icon className="w-8 h-8 text-gold-400 mb-4" />
                  <h4 className="font-heading text-lg text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Gallery Section */}
      <section className="py-24 md:py-32 bg-obsidian-400" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Our Work
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-white">
              Showcase Designs
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden cursor-pointer group image-zoom gold-border-glow"
                onClick={() => openLightbox(index)}
                data-testid={`gallery-image-${index}`}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-white font-heading text-lg">{image.title}</p>
                    <p className="text-gold-400 text-xs uppercase tracking-widest mt-2">
                      {image.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/designs">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:border-gold-400 hover:text-gold-400 uppercase tracking-widest text-xs px-8 py-5 rounded-sm"
                data-testid="gallery-view-all"
              >
                View All Designs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 md:py-32 bg-obsidian-500" data-testid="pricing-preview-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Subscription Plans
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-white">
              Choose Your Package
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPreview.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 border rounded-lg card-hover ${
                  plan.highlight
                    ? "pricing-featured border-gold-400/50"
                    : "bg-obsidian-400/30 border-white/10"
                }`}
                data-testid={`pricing-preview-${index}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-400 text-black text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest">
                    Popular
                  </div>
                )}
                <h3 className="font-heading text-2xl text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-4xl text-gold-400">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/pricing">
              <Button
                className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-8 py-5 rounded-sm btn-shine"
                data-testid="pricing-view-full"
              >
                View Full Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-obsidian-400 relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-400/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-6">
              Upgrade Your Jewelry
              <span className="block gold-text">Design Workflow</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Partner with us for premium CAD and rendering services that elevate
              your jewelry collections.
            </p>
            <Link to="/contact">
              <Button
                className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-10 py-6 rounded-sm btn-shine"
                data-testid="cta-contact"
              >
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </div>
  );
};

export default HomePage;
