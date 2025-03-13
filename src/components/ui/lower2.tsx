import React from 'react'

export default function LOWERWEB() {
  return (
    <div>

    <section className="px-6 md:px-20 py-16 bg-gray-100 text-center">
          <h2 className="text-3xl md:text-8xl font-bold tracking-tighter text-gray-800 mb-8">
            How to Summarize Websites & Articles?
          </h2>
          <p className="text-2xl tracking-tighter text-gray-600 mb-12 max-w-2xl mx-auto">
            {`Quickly extract key insights from web pages and articles in 3 simple steps using TubeAbstract's AI-powered summarizer.`}
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 1",
                title: "Enter Website URL",
                description: "Copy and paste the URL of the article or web page into TubeAbstract.",
                icon: "🌐",
              },
              {
                step: "Step 2",
                title: "Generate Summary",
                description:
                  `Click the "Generate Summary" button, and TubeAbstract will analyze and summarize the webpage content.`,
                icon: "⚡",
              },
              {
                step: "Step 3",
                title: "Read AI Summary",
                description: "Get a concise, AI-generated summary and save time reading lengthy articles.",
                icon: "📖",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  {item.step}: {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-20 py-16 text-center">
          <h2 className="text-3xl md:text-8xl tracking-tighter font-bold text-gray-800 mb-8">
            Who Can Benefit from Website Summarization?
          </h2>
          <p className="text-2xl tracking-tighter text-gray-600 mb-12 max-w-2xl mx-auto">
            Ideal for students, professionals, researchers, and anyone looking to quickly understand lengthy web content.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Students",
                description:
                  "Summarize educational articles and research papers efficiently to boost your learning.",
                icon: "🎓",
              },
              {
                title: "For Professionals",
                description:
                  "Stay updated with industry news and reports without spending hours reading.",
                icon: "💼",
              },
              {
                title: "For Researchers",
                description:
                  "Quickly extract key findings from academic papers and articles for faster analysis.",
                icon: "🔬",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md border transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

    </div>
  )
}
