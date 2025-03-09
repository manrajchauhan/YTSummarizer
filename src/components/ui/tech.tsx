"use client";

export default function TechnologySection() {
  const technologies = [
    { name: "React", percentage: 100 },
    { name: "Tailwind CSS", percentage: 55 },
    { name: "Javascript", percentage: 90 },
    { name: "NodeJS", percentage: 100 },
  ];

  return (
    <section className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Technology to Build this Tool
          </h2>
          <p className="mt-3 text-gray-600">
            To build YouTube summaries, the following technologies are used with Google's YouTube API and Gemini API.
          </p>


          <div className="mt-6 space-y-4">
            {technologies.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">{tech.name}</span>
                  <span className="text-gray-700 font-bold">{tech.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-red-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${tech.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="/skills.png"
            alt="Technology Illustration"
            className="w-full max-w-lg mx-auto"
          />
        </div>

      </div>
    </section>
  );
}
