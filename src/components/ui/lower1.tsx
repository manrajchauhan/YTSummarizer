import React from 'react'

export default function LOWERYT() {
  return (
    <div>

<section className="px-6 md:px-20 py-16 bg-gray-100 text-center">
  <h2 className="text-3xl md:text-8xl font-bold text-gray-800 mb-8 tracking-tighter">
    How to Summarize YouTube Videos?
  </h2>
  <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
  {`Easily summarize YouTube videos in just 3 simple steps with TubeAbstract's AI-powered tool.`}
</p>

  <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
    {[
      {
        step: "Step 1",
        title: "Get YouTube Video Link",
        description: "Copy and paste the YouTube video link into TubeAbstract.",
        icon: "📋",
      },
      {
        step: "Step 2",
        title: "Generate Summary",
        description:
          "Click the &quot;Generate Summary&quot; button, and TubeAbstract will fetch the transcript and summarize the video.",
        icon: "⚡",
      },
      {
        step: "Step 3",
        title: "Read AI Summary",
        description: "Read the concise summary and save valuable time.",
        icon: "📖",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        <div className="text-4xl">{item.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.step}: {item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
</section>

<section className="px-6 md:px-20 py-16 text-center">
  <h2 className="text-3xl md:text-8xl font-bold text-gray-800 mb-8">
    Use Cases for Different Roles
  </h2>
  <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
    Designed for students, researchers, and professionals looking to extract key insights from videos effortlessly.
  </p>

  <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
    {[
      {
        title: "For Students",
        description:
          "Stay ahead in your studies by summarizing lectures and tutorials quickly.",
        icon: "🎓",
      },
      {
        title: "For Professionals",
        description:
          "Grasp key points from industry talks, conferences, and webinars with ease.",
        icon: "💼",
      },
      {
        title: "For Researchers",
        description:
          "Explore and digest vast collections of YouTube video materials efficiently.",
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
