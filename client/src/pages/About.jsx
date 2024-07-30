import video from "../assets/video/gif.mp4";

export default function About() {
  return (
    <section className="px-8 page md:px-16">
      <h1 className="mx-auto my-8 text-4xl text-center md:w-3/4 md:text-6xl">
        Origins digital - Where Every Sport Comes to Life
      </h1>
      <p>
        At Origins Digital, we believe that storytelling transcends borders,
        languages, and cultures. As a premier OTT (Over-The-Top) platform, we
        are dedicated to bringing you an exceptional streaming experience,
        offering a wide array of content that caters to every taste and
        preference.
      </p>
      <article className="about-article">
        <h2>Our vision</h2>
        <p>
          Our vision is to create a global community of entertainment
          enthusiasts who can enjoy high-quality video content anytime,
          anywhere. We aim to be the go-to destination for those seeking both
          mainstream and niche genres, ensuring there’s something for everyone.
        </p>
      </article>
      <article className="about-article">
        <h2>Our Commitment to Quality</h2>
        <p>
          We are committed to delivering top-notch streaming quality, with a
          seamless and user-friendly interface. Our content library is
          continuously updated with fresh and exciting titles, ensuring you’ll
          always find something new to watch.
        </p>
      </article>
      <article className="about-article">
        <h2>What We Offer</h2>
        <div className="flex flex-col items-center md:flex-row">
          <p className="w-full mb-2 md:mr-4 md:w-1/2">
            Origins Digital specializes in delivering an extensive range of
            sports content to satisfy every sports enthusiast. Our platform
            features videos across many categories, including live sports
            events, in-depth analysis, behind-the-scenes footage, and exclusive
            interviews with athletes. Whether you're a fan of football,
            basketball, tennis, motorsports, or any other sport, Origins Digital
            provides you with the ultimate sports streaming experience.
          </p>
          <div className="w-full h-auto mt-4 md:w-1/2">
            <video className="w-full h-full" autoPlay loop>
              <source src={video} />
            </video>
          </div>
        </div>
      </article>
      <article className="about-article">
        <h2>Join Our Community</h2>
        <p>
          At Origins Digital, you are more than just a viewer; you are part of a
          vibrant community. Engage with fellow fans, participate in
          discussions, and share your favorite moments on our platform. We are
          here to support and enhance your viewing experience every step of the
          way.
        </p>
      </article>
      <article className="about-article">
        <h2>Contact Us</h2>
        <p>
          For any inquiries, support, or feedback, please reach out to our
          dedicated customer service team. We are here to ensure your experience
          with Origins Digital is nothing short of exceptional.
        </p>
      </article>
    </section>
  );
}
