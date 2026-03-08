import { motion } from "framer-motion";
import { MapPin, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [interest, setInterest] = useState("ai");
  const [consent, setConsent] = useState(false);

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 bg-primary pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative">
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
            CONTACT
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's Build Something Amazing
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!consent) return;
              }}
              className="space-y-6 relative"
            >
              {["Name", "Email"].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <label className="font-mono-label text-muted-foreground mb-2 block">{field}</label>
                  <input
                    type={field === "Email" ? "email" : "text"}
                    required
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder={field === "Email" ? "your@email.com" : "Your name"}
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="font-mono-label text-muted-foreground mb-3 block">Area of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "ai", label: "AI" },
                    { value: "webdev", label: "Web Dev" },
                    { value: "robotics", label: "Robotics" },
                  ].map((opt) => (
                    <motion.label
                      key={opt.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        interest === opt.value
                          ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(24_100%_50%/0.3)]"
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
                    </motion.label>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
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
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity w-full justify-center relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <Send size={16} />
                </span>
                <Sparkles size={14} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            {[
              { icon: MapPin, title: "Location", value: "Budapest, Hungary" },
              { icon: Phone, title: "Phone", value: "Available upon request" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 5 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <motion.div
                  className="p-3 rounded-xl bg-muted text-primary flex-shrink-0"
                  whileHover={{ rotate: 15 }}
                >
                  <item.icon size={24} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card p-6"
            >
              <h4 className="font-mono-label text-primary mb-4">SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                {["Python", "C#", "Java", "C", "JavaScript", "Computer Vision", "Machine Learning", "Robotics"].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="badge-glass"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1, borderColor: "hsl(24 100% 50% / 0.5)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
