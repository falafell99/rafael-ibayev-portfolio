import { motion } from "framer-motion";
import { MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [interest, setInterest] = useState("ai");
  const [consent, setConsent] = useState(false);

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono-label text-primary mb-4 block">CONTACT</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's Build Something Amazing
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Form */}
          <div className="glass-card p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!consent) return;
              }}
              className="space-y-6"
            >
              <div>
                <label className="font-mono-label text-muted-foreground mb-2 block">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono-label text-muted-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-mono-label text-muted-foreground mb-3 block">Area of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "ai", label: "AI" },
                    { value: "webdev", label: "Web Dev" },
                    { value: "robotics", label: "Robotics" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        interest === opt.value
                          ? "bg-primary text-primary-foreground"
                          : "glass-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt.value}
                        checked={interest === opt.value}
                        onChange={(e) => setInterest(e.target.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded border-border bg-muted text-primary focus:ring-primary"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    I consent to being contacted for collaboration purposes.
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity w-full justify-center"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-sm text-muted-foreground">Budapest, Hungary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-sm text-muted-foreground">(+36) 705668417</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h4 className="font-mono-label text-primary mb-3">SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {["Python", "C#", "Java", "C", "JavaScript", "Computer Vision", "Machine Learning", "Robotics"].map((skill) => (
                  <span key={skill} className="badge-glass">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
