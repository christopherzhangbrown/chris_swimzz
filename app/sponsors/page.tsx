import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink } from "lucide-react"

export default function SponsorsPage() {
  const sponsors = [
    {
      name: "Arena",
      logo: "/images/Sponsors/Arena_(Unternehmen)_logo.svg",
      description: "Premium swimwear and equipment",
      category: "Swimwear",
      website: "https://www.arenasport.com/en_us/",
      code: "amb-chris10",
      codeDescription: "10% off all products",
    },
    {
      name: "Cal AI",
      logo: "/images/Sponsors/calAIrectangle.svg",
      description: "AI-powered calorie tracking app",
      category: "Technology",
      website: "https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616",
      code: "CHRISSWIMZZ",
      codeDescription: "3 days free trial",
    },
    {
      name: "SBR Sports",
      logo: "/images/Sponsors/SBR_logo_2e216e6c-8a4d-459a-bb69-10131f6e384a.webp",
      description: "Swimmer care products",
      category: "Performance",
      website: "https://www.sbrsportsinc.com/?sca_ref=7937126.heHPWDBAqKvozy4",
      code: "CHRISSWIMZZ",
      codeDescription: "20% off all products",
    },
    {
      name: "Feed The Cheeks",
      logo: "/images/Sponsors/LOGO_WEBSITE_f7915b30-5928-4c9f-8018-d2b3ed5ed100.webp",
      description: "Rhode Island gourmet cookies",
      category: "Nutrition",
      website: "https://www.feedthecheeks.com/",
      code: null,
      codeDescription: null,
    },
    {
      name: "Block Cancer",
      logo: "/images/Sponsors/BC+PNG.png",
      description: "Cancer awareness and support",
      category: "Charity",
      website: "https://www.blockcancer.co/?srsltid=AfmBOoolzCyO9CAzq2K_efoj5YG3e_3TNvcOtoagxlN3I59ddmfUDdY1",
      code: null,
      codeDescription: null,
    },
    {
      name: "Honey Stinger",
      logo: "/images/Sponsors/honey-stinger-logo.png",
      description: "Natural energy and recovery",
      category: "Nutrition",
      website: "https://honeystinger.rfrl.co/ex47z",
      code: null,
      codeDescription: null,
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="gradient-text">Partners</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            I'm proud to work with these amazing brands that support my swimming journey and help me create valuable
            content for the swimming community.
          </p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative overflow-hidden rounded-lg p-8 bg-white">
                    <Image
                      src={sponsor.logo || "/images/logos/logoblackimg.png"}
                      alt={`${sponsor.name} logo`}
                      width={200}
                      height={100}
                      className={`mx-auto group-hover:scale-110 transition-transform duration-300 filter brightness-0 ${
                        sponsor.name === "Arena" || sponsor.name === "SBR Sports" 
                          ? "h-16 w-full object-contain" 
                          : "h-16 w-auto object-contain"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{sponsor.name}</h3>
                  <p className="text-gray-600 mb-3">{sponsor.description}</p>
                  {sponsor.code && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-4">
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        Code: <span className="font-bold text-blue-900">{sponsor.code}</span>
                      </p>
                      <p className="text-xs text-blue-700">{sponsor.codeDescription}</p>
                    </div>
                  )}
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Partner With Me?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach an engaged community of swimmers and athletes through authentic content and partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">20K+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Engaged Followers</h3>
              <p className="text-gray-600">Active community of swimmers and athletes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">D1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Elite Athlete</h3>
              <p className="text-gray-600">Competing at the highest collegiate level</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">500+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Pieces</h3>
              <p className="text-gray-600">Regular, high-quality content creation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Partnering?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            For any business inquiries, please contact us at the email below.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <Mail className="mr-2 h-5 w-5" />
            chrisswimzzinquires@gmail.com
          </Button>
        </div>
      </section>
    </div>
  )
}
