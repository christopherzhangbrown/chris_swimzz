import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Target, Users, Instagram, Mail, Award, Zap } from "lucide-react"

export default function AboutPage() {
  const skills = [
    { icon: Award, title: "D1 Competitive Swimming", description: "12+ years of competitive experience" },
    { icon: Users, title: "Content Creation", description: "Engaging 20K+ followers with valuable content" },
    { icon: Target, title: "Performance Analysis", description: "Technical expertise in swimming mechanics" },
    { icon: Zap, title: "Coaching Insights", description: "Sharing knowledge to help others improve" },
  ]

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in both athletics and academics",
    },
    {
      title: "Education",
      description: "Sharing knowledge to help the next generation of swimmers succeed",
    },
    {
      title: "Authenticity",
      description: "Being genuine and transparent in all content and interactions",
    },
    {
      title: "Community",
      description: "Building connections and supporting fellow swimmers on their journey",
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Introduction Section - Mobile Responsive */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-slide-up text-center lg:text-left order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Hey, I'm <span className="gradient-text">Chris</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6">
                I'm a Division 1 swimmer at Brown University and content creator passionate about sharing the art and
                science of swimming with the world.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-8">
                Through my platform @chris_swimzz, I combine my competitive experience with my love for teaching to help
                swimmers of all levels improve their technique, mindset, and performance in the pool.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 mb-6">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Charlotte, NC → Providence, RI</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-fade-in order-2 w-full flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/images/medalpicoutlined.png"
                  alt="Christopher Zhang - Professional Headshot"
                  width={350}
                  height={430}
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The journey that led me to create this platform and share my passion for swimming
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <div className="space-y-6 text-base sm:text-lg text-gray-700">
                  <p>
                    My swimming journey began over 12 years ago in Charlotte, North Carolina. What started as a fun
                    activity quickly became a deep passion that would shape my entire life. Swimming with Lifetime Swim
                    and later Ardrey Kell High School, I discovered not just my love for the sport, but my desire to
                    help others experience the same joy and growth I found in the water.
                  </p>

                  <p>
                    The transition to collegiate swimming at Brown University opened my eyes to the incredible community
                    of swimmers worldwide who were hungry for quality content, technique tips, and motivation. I
                    realized that my unique perspective as both a competitive athlete and someone studying Computer
                    Science and Economics could bring a fresh approach to swimming education.
                  </p>

                  <p>
                    <strong>The inspiration for @chris_swimzz came from a simple realization:</strong> there were
                    countless swimmers out there who could benefit from the knowledge I'd gained through years of
                    training, competing, and learning from incredible coaches. I wanted to bridge the gap between elite
                    swimming knowledge and everyday swimmers looking to improve.
                  </p>

                  <p>
                    Every piece of content I create is driven by the belief that swimming is more than just a sport—it's
                    a vehicle for personal growth, discipline, and community. Through challenges, victories, and
                    everything in between, I've learned that sharing our journey makes us all stronger.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise and Skills */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expertise & Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What I bring to the swimming community through years of experience and dedication
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What drives me and sets my approach apart in the swimming community
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">My Mission</h3>
                <p className="text-base sm:text-lg opacity-90">
                  To democratize elite swimming knowledge and inspire the next generation of swimmers through authentic,
                  educational content that bridges the gap between competitive excellence and accessible learning.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beyond the Pool</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Getting to know the person behind the content</p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-1">
              <div className="space-y-6 text-base sm:text-lg text-gray-700">
                <p>
                  When I'm not in the pool or creating content, you'll find me diving deep into my studies in Computer
                  Science and Economics at Brown University. This unique combination gives me a analytical approach to
                  swimming that I love sharing with my community.
                </p>

                <p>
                  Originally from Charlotte, North Carolina, d for college has been an incredible journey
                  of growth both in and out of the water.
                </p>

                <p>
                  I believe in the power of technology to enhance athletic performance, which is why I'm excited about
                  projects like the AI Start Analyzer. Combining my technical background with my swimming expertise
                  allows me to create innovative solutions for the swimming community.
                </p>

                <p>
                  My goal is to make elite swimming knowledge accessible to everyone, regardless of their current level
                  or background. Every swimmer deserves the opportunity to improve and find joy in the sport I love so
                  much.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-2 w-full flex justify-center lg:justify-end">
              <Image
                src="/images/IMG_8018.JPG"
                alt="Christopher Zhang - Casual Photo"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Ready to take your swimming to the next level? Join my community and let's grow together in this incredible
            sport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/chris_swimzz/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Instagram className="mr-2 h-5 w-5" />
                Follow @chris_swimzz
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
