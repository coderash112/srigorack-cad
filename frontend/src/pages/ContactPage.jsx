import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const location = useLocation();
  const preselectedPackage = location.state?.package || "";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    package_interest: preselectedPackage,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (value) => {
    setFormData((prev) => ({ ...prev, package_interest: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        package_interest: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ashrut@gorack.in",
      href: "mailto:ashrut@gorack.in",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-9981834205",
      href: "tel:+919981834205",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India",
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-500 pt-32" data-testid="contact-page">
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
              Get In Touch
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-6" data-testid="contact-title">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to transform your jewelry designs? Get in touch with us today
              and let's discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-2xl text-white mb-8">
                Let's Start a Conversation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're looking for CAD design services, rendering
                solutions, or have questions about our packages, we're here to
                help.
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">
                        {info.title}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-gold-400 transition-colors"
                          data-testid={`contact-info-${info.title.toLowerCase()}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Info */}
              <div className="bg-obsidian-400/50 border border-white/5 p-6 rounded-lg">
                <h3 className="font-heading text-lg text-white mb-2">
                  SriGoRack Technologies Pvt Ltd
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Premium CAD & Rendering services for the jewelry and diamond
                  industry. Transforming your ideas into precision designs.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-obsidian-400/30 border border-white/5 p-8 md:p-10 rounded-lg">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-gold-400" />
                    </div>
                    <h3 className="font-heading text-2xl text-white mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20 text-white hover:border-gold-400 hover:text-gold-400"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-muted-foreground text-sm">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="bg-transparent border-white/10 focus:border-gold-400 text-white placeholder:text-white/30"
                          data-testid="contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-muted-foreground text-sm">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="bg-transparent border-white/10 focus:border-gold-400 text-white placeholder:text-white/30"
                          data-testid="contact-company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-muted-foreground text-sm">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-transparent border-white/10 focus:border-gold-400 text-white placeholder:text-white/30"
                          data-testid="contact-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-muted-foreground text-sm">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 890"
                          className="bg-transparent border-white/10 focus:border-gold-400 text-white placeholder:text-white/30"
                          data-testid="contact-phone"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">
                        Interested Package
                      </Label>
                      <Select
                        value={formData.package_interest}
                        onValueChange={handlePackageChange}
                      >
                        <SelectTrigger
                          className="bg-transparent border-white/10 focus:border-gold-400 text-white"
                          data-testid="contact-package"
                        >
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent className="bg-obsidian-300 border-white/10">
                          <SelectItem value="Starter" className="text-white hover:bg-white/10">
                            Starter Package - $799/month
                          </SelectItem>
                          <SelectItem value="Professional" className="text-white hover:bg-white/10">
                            Professional Package - $1,299/month
                          </SelectItem>
                          <SelectItem value="Enterprise" className="text-white hover:bg-white/10">
                            Enterprise Package - $1,999/month
                          </SelectItem>
                          <SelectItem value="Custom" className="text-white hover:bg-white/10">
                            Custom Package
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-muted-foreground text-sm">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={5}
                        className="bg-transparent border-white/10 focus:border-gold-400 text-white placeholder:text-white/30 resize-none"
                        data-testid="contact-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs py-6 rounded-sm btn-shine"
                      data-testid="contact-submit"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
