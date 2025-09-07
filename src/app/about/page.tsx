"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Users, Award, Heart, Clock, Truck, Shield } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "15+", label: "Partner Restaurants", icon: Award },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "45", label: "Min Delivery Time", icon: Clock },
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Taste",
      description: "We preserve traditional Maharashtrian recipes passed down through generations, ensuring every bite carries the authentic flavors of Maharashtra."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every restaurant in our network undergoes rigorous quality checks to maintain the highest standards of hygiene and taste."
    },
    {
      icon: Truck,
      title: "Fresh Delivery",
      description: "Our efficient delivery system ensures your food arrives hot and fresh, maintaining the authentic taste and temperature."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We support local restaurants and communities, helping preserve culinary traditions while providing economic opportunities."
    }
  ];

  const team = [
    {
      name: "Rajesh Patil",
      role: "Founder & CEO",
      image: "https://placehold.co/200x200?text=RP",
      description: "Passionate about preserving Maharashtrian culinary heritage with 15+ years in the food industry."
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://placehold.co/200x200?text=PS",
      description: "Ensures seamless operations and maintains quality standards across all partner restaurants."
    },
    {
      name: "Vikram Desai",
      role: "Technology Director",
      image: "https://placehold.co/200x200?text=VD",
      description: "Leads our tech team to create innovative solutions for better food delivery experiences."
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#1a4037] mb-6"
        >
          About TradiFeast
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#5a5a5a] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          We are passionate about bringing authentic Maharashtrian cuisine to your doorstep, 
          preserving traditional recipes while embracing modern convenience.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center"
          >
            <stat.icon className="h-8 w-8 text-[#1a4037] mx-auto mb-3" />
            <div className="text-2xl md:text-3xl font-bold text-[#1a4037] mb-1">{stat.number}</div>
            <div className="text-[#5a5a5a] text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-[#1a4037] mb-6">Our Story</h2>
          <div className="space-y-4 text-[#5a5a5a] leading-relaxed">
            <p>
              TradiFeast was born from a simple yet powerful vision: to make authentic Maharashtrian cuisine 
              accessible to everyone, everywhere. Founded in 2020 by Rajesh Patil, a native of Pune with deep 
              roots in Maharashtrian culinary traditions.
            </p>
            <p>
              Growing up in a family where food was more than sustenance—it was culture, heritage, and love—Rajesh 
              noticed that authentic Maharashtrian thalis were becoming increasingly difficult to find, especially 
              for busy professionals and families.
            </p>
            <p>
              Today, we partner with carefully selected restaurants across Maharashtra, each chosen for their 
              commitment to traditional recipes and quality ingredients. We believe that great food should be 
              accessible, convenient, and always authentic.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative h-96 rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <Image
              src="https://placehold.co/600x400?text=Traditional+Maharashtrian+Kitchen"
              alt="Traditional Maharashtrian Kitchen"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a4037]/20 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="bg-[#f5f3f0] rounded-xl p-8 md:p-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#1a4037] mb-6">Our Mission</h2>
          <p className="text-[#5a5a5a] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            To preserve and promote authentic Maharashtrian culinary heritage by connecting traditional 
            recipes with modern convenience, ensuring that every family can enjoy the rich flavors and 
            cultural significance of Maharashtra's diverse cuisine.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-[#1a4037] text-center mb-12"
        >
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a4037]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <value.icon className="h-6 w-6 text-[#1a4037]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a4037] mb-2">{value.title}</h3>
                  <p className="text-[#5a5a5a] leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-3xl font-bold text-[#1a4037] text-center mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#1a4037]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1a4037] mb-1">{member.name}</h3>
              <p className="text-[#2d544c] font-medium mb-3">{member.role}</p>
              <p className="text-[#5a5a5a] text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-[#1a4037] to-[#2d544c] rounded-xl p-8 md:p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
          Whether you're a food lover, restaurant owner, or someone passionate about preserving 
          culinary traditions, we'd love to have you as part of the TradiFeast family.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/restaurants"
            className="inline-block px-8 py-3 bg-white text-[#1a4037] font-medium rounded-lg hover:bg-[#f5f3f0] transition-colors"
          >
            Explore Restaurants
          </a>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-[#1a4037] transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </div>
  );
}


