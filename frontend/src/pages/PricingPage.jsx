import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "../components/ui/button";

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Starter",
      tagline: "Best for small jewelry retailers",
      price: "$799",
      period: "/month",
      highlight: false,
      features: [
        "Up to 35 CAD designs per month",
        "5 Renderings included",
        "Standard turnaround time",
        "Email support",
        "Manufacturing-ready files",
        "Basic revisions included",
      ],
    },
    {
      name: "Professional",
      tagline: "Best for growing manufacturers",
      price: "$1,299",
      period: "/month",
      highlight: true,
      features: [
        "Up to 60 CAD designs per month",
        "15 Renderings included",
        "Faster delivery priority",
        "Dedicated designer support",
        "Manufacturing-ready files",
        "Unlimited revisions",
        "Priority queue access",
      ],
    },
    {
      name: "Enterprise",
      tagline: "Best for diamond manufacturers",
      price: "$1,999",
      period: "/month",
      highlight: false,
      features: [
        "Unlimited CAD designs*",
        "30 Renderings included",
        "Priority delivery",
        "Dedicated team assigned",
        "Manufacturing-ready files",
        "Custom jewelry collections",
        "24/7 support access",
        "White-label options",
      ],
      note: "*Fair usage: up to 2 active requests at a time",
    },
  ];

  const faqs = [
    {
      question: "What file formats do you deliver?",
      answer:
        "We deliver files in all major CAD formats including STL, OBJ, 3DM (Rhino), and STEP. Renderings are delivered in high-resolution PNG and JPEG formats.",
    },
    {
      question: "How does the subscription work?",
      answer:
        "Our subscriptions are billed monthly. You get a set number of CAD designs and renderings each month. Unused credits don't roll over to the next month.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. Changes will take effect from the next billing cycle.",
    },
    {
      question: "What is the typical turnaround time?",
      answer:
        "Standard turnaround is 3-5 business days for CAD designs and 2-3 days for renderings. Priority plans get faster delivery.",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-500 pt-32" data-testid="pricing-page">
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
              Subscription Plans
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-6" data-testid="pricing-title">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that fits your jewelry business. All plans include
              manufacturing-ready files and professional support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 md:p-10 border rounded-lg transition-all duration-300 ${
                  plan.highlight
                    ? "pricing-featured border-gold-400/50 scale-105"
                    : "bg-obsidian-400/30 border-white/10 hover:border-white/20"
                }`}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-400 text-black text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-2xl text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="font-heading text-5xl text-gold-400">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.note && (
                  <p className="text-xs text-muted-foreground italic mb-6">
                    {plan.note}
                  </p>
                )}

                <Link to="/contact" state={{ package: plan.name }}>
                  <Button
                    className={`w-full font-semibold uppercase tracking-widest text-xs py-6 rounded-sm btn-shine ${
                      plan.highlight
                        ? "bg-gold-400 text-black hover:bg-white"
                        : "bg-white/10 text-white hover:bg-gold-400 hover:text-black"
                    }`}
                    data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-obsidian-400">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Questions
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-obsidian-500/50 border border-white/5 p-6 rounded-lg"
                data-testid={`faq-${index}`}
              >
                <h4 className="font-heading text-lg text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-obsidian-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Contact us to discuss a tailored solution for your jewelry business
              needs.
            </p>
            <Link to="/contact">
              <Button
                className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-8 py-5 rounded-sm btn-shine"
                data-testid="custom-package-cta"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
