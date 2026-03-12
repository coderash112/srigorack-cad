import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Clock, Gem, Users, Target, Zap, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const AboutPage = () => {
  const stats = [
    { value: "500+", label: "Designs Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
    { value: "24h", label: "Support Response" },
  ];

  const values = [
    {
      icon: Gem,
      title: "Precision Engineering",
      description:
        "Every CAD model is crafted with meticulous attention to detail, ensuring manufacturing-ready precision.",
    },
    {
      icon: Target,
      title: "Client-Focused",
      description:
        "We work closely with our clients to understand their vision and deliver designs that exceed expectations.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We stay at the forefront of jewelry CAD technology to provide cutting-edge design solutions.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "Our team provides personalized support throughout the design process and beyond.",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-500 pt-32" data-testid="about-page">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              About Us
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-6" data-testid="about-title">
              SriGoRack Technologies
              <span className="block text-gold-400">Pvt Ltd</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are a technology and design company specializing in CAD modeling
              and photorealistic rendering for the jewelry and diamond industry.
              Our team combines engineering precision with artistic rendering to
              help jewelry manufacturers bring their designs to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-obsidian-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="font-heading text-4xl md:text-5xl gold-text mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
                Crafting Digital Excellence in Jewelry Design
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SriGoRack Technologies was founded with a vision to bridge the
                  gap between traditional jewelry craftsmanship and modern digital
                  design technology.
                </p>
                <p>
                  Our team of experienced CAD designers and rendering specialists
                  bring years of expertise in the jewelry industry, understanding
                  the unique requirements of diamond manufacturers, jewelry
                  retailers, and design studios.
                </p>
                <p>
                  We offer scalable subscription packages that provide continuous
                  design support, allowing our clients to focus on what they do
                  best – creating beautiful jewelry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden gold-border-glow">
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2070&auto=format&fit=crop"
                  alt="Jewelry Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-400/20 rounded-lg blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-obsidian-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              What Drives Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-obsidian-500/50 border border-white/5 p-8 rounded-lg card-hover"
                data-testid={`value-${index}`}
              >
                <div className="w-12 h-12 rounded-sm bg-gold-400/10 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h4 className="font-heading text-xl text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-obsidian-400/50 border border-white/5 p-6 rounded-lg">
                    <Award className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="font-heading text-lg text-white">Expert Team</h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      Skilled CAD specialists with jewelry industry experience
                    </p>
                  </div>
                  <div className="bg-obsidian-400/50 border border-white/5 p-6 rounded-lg">
                    <Zap className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="font-heading text-lg text-white">Fast Delivery</h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      Quick turnaround without compromising quality
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-obsidian-400/50 border border-white/5 p-6 rounded-lg">
                    <Clock className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="font-heading text-lg text-white">24/7 Support</h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      Always available to assist with your projects
                    </p>
                  </div>
                  <div className="bg-obsidian-400/50 border border-white/5 p-6 rounded-lg">
                    <Gem className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="font-heading text-lg text-white">Quality First</h4>
                    <p className="text-muted-foreground text-sm mt-2">
                      Manufacturing-ready files every time
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
                Our Team
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
                Dedicated Professionals at Your Service
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our team consists of skilled CAD designers, rendering artists,
                and project managers who are passionate about jewelry design.
                We work collaboratively to ensure every project meets the
                highest standards of quality and precision.
              </p>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:border-gold-400 hover:text-gold-400 uppercase tracking-widest text-xs px-6 py-5 rounded-sm"
                  data-testid="about-cta"
                >
                  Work With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Let us help you bring your jewelry designs to life with our premium
              CAD and rendering services.
            </p>
            <Link to="/contact">
              <Button
                className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-8 py-5 rounded-sm btn-shine"
                data-testid="about-contact-cta"
              >
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
