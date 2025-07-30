import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Award, Instagram, Timer, Users, ArrowRight, Brain, Mail, Star } from "lucide-react"

export default function HomePage() {
  const stats = [
    { label: "Instagram Followers", value: "20K+", icon: Instagram },
    { label: "Years Swimming", value: "12+", icon: Timer },
    { label: "Brown University", value: "D1", icon: Award },
  ]

  const popularVideos = [
    {
      title: "Day in the Life",
      views: "230K views",
      thumbnail: "/images/DayInTheLife.png",
    },
    {
      title: "Top Tips",
      views: "253K views",
      thumbnail: "/images/TopTips.png",
    },
    {
      title: "Brutally Honest Race Analysis",
      views: "137K views",
      thumbnail: "/images/BHRA.png",
    },
  ]

  const pagePreviews = [
    {
      title: "About My Journey",
      description:
        "Discover the story behind @chris_swimzz and what drives my passion for swimming and content creation.",
      icon: Users,
      link: "/about",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Our Sponsors",
      description: "Meet the amazing brands that support my swimming journey: Arena, Cal AI, SBR Sports, and more.",
      icon: Star,
      link: "/sponsors",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "AI Start Analyzer",
      description:
        "Revolutionary AI technology that analyzes your swimming starts. Join the waitlist for early access!",
      icon: Brain,
      link: "/ai-start",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Get In Touch",
      description: "Ready to collaborate or have questions? Let's connect and grow the swimming community together.",
      icon: Mail,
      link: "/contact",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile Responsive */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-slide-up text-center lg:text-left order-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
                CHRIS
                <br />
                <span className="gradient-text">SWIMZZ</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Division 1 swimmer at Brown University sharing swimming insights, training techniques, and inspiring the
                next generation of swimmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="https://www.instagram.com/chris_swimzz/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow My Instagram
                  </Button>
                </a>
                <Link href="/ai-start">
                  <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                    <Brain className="mr-2 h-5 w-5" />
                    Try AI Analyzer
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-fade-in order-2 w-full flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/images/blackwhitebrownborder.png"
                  alt="Christopher Zhang - Chris Swimzz"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page Previews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore More</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover everything I have to offer - from my story to cutting-edge swimming technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pagePreviews.map((preview, index) => (
              <Link key={index} href={preview.link}>
                <Card className="card-hover border-0 shadow-lg h-full cursor-pointer group">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${preview.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <preview.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{preview.title}</h3>
                    <p className="text-gray-600 text-sm flex-grow mb-4">{preview.description}</p>
                    <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Videos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Content</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out my most popular swimming content helping swimmers improve their technique and performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularVideos.map((video, index) => (
              <Card key={index} className="card-hover cursor-pointer border-0 shadow-lg flex flex-col h-[420px]">
                <CardContent className="p-0 flex-1 flex flex-col">
                  <a href={
                    video.title === "Top Tips"
                      ? "https://www.instagram.com/stories/highlights/18036885218433292/"
                      : video.title === "Day in the Life"
                      ? "https://www.instagram.com/stories/highlights/18035038568011095/"
                      : "https://www.instagram.com/stories/highlights/18084130924583838/"
                  } target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                    <div className="relative">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={400}
                        height={320}
                        className="rounded-t-lg object-cover w-full h-[320px]"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-end">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.views}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://www.instagram.com/chris_swimzz/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                <Instagram className="mr-2 h-5 w-5" />
                View All Content
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join my community and get exclusive access to training tips, technique analysis, and swimming insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/chris_swimzz/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Instagram className="mr-2 h-5 w-5" />
                Follow on Instagram
              </Button>
            </a>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Users className="mr-2 h-5 w-5" />
                Read My Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
