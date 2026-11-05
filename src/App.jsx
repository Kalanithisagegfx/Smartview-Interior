import React from "react";
import { useEffect, useState } from "react";
import emailIcon from "./Assets/icon/2-2.webp";
import brandLogo from "./Assets/image/Untitled-design-28.webp";
import aboutImage from "./Assets/image/aboutimg.webp";
import modernLivingHero from "./Assets/image/modern-living-room-interior-design.webp";
import beautifulKitchenHero from "./Assets/image/beautiful-kitchen-interior-design.webp";
import introImageThree from "./Assets/image/Add-a-subheading-3-150x150.webp";
import introImageFour from "./Assets/image/Add-a-subheading-4.webp";
import introImageFive from "./Assets/image/Add-a-subheading-5.webp";
import whatsappKitchenHero from "./Assets/image/page-title.webp";
import phoneIcon from "./Assets/icon/1-2.webp";
import pinIcon from "./Assets/icon/3-2.webp";
import workspaceImage1 from "./Assets/image/2-19.webp";
import workspaceImage2 from "./Assets/image/4-17.webp";
import workspaceImage3 from "./Assets/image/9-11.webp";
import workspaceImage4 from "./Assets/image/10-7.webp";
import workspaceImage5 from "./Assets/image/14-1.webp";
import workspaceImage6 from "./Assets/image/17.webp";
import workspaceImage7 from "./Assets/image/18.webp";
import workspaceImage8 from "./Assets/image/19.webp";
import serviceImageWood from "./Assets/image/2-1.webp";
import serviceImageKitchen from "./Assets/image/3-1.webp";
import serviceImageCommercial from "./Assets/image/4.webp";
import serviceImageDesign from "./Assets/image/Smart-View-3.webp";
import serviceImageRenovation from "./Assets/image/Untitled-design-21.webp";
import founderTeamImage from "./Assets/image/1-3.webp";
import sundarTeamImage from "./Assets/image/2-3.webp";
import kavithaTeamImage from "./Assets/image/3-3.webp";
import isoCertificateImage from "./Assets/image/WhatsApp-Image-2025-02-10-at-1.53.30-PM.webp";
import bifmaCertificateImage from "./Assets/image/BIFMA-CERTIFICATE_page-0001.webp";
import threeD from "./Assets/icon/1-1.webp";
import warranty from "./Assets/icon/2-1.webp";
import projectsIcon from "./Assets/icon/3-1.webp";
import planning from "./Assets/icon/4.webp";
import support from "./Assets/icon/5.webp";
import consultation from "./Assets/icon/6.webp";

async function submitFormToFormSubmit(event, setStatus, setSubmitting) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  setStatus("");
  setSubmitting(true);
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      throw new Error("The enquiry could not be sent. Please try again, or contact us by phone.");
    }
    setStatus("Thanks! Your enquiry has been sent.");
    form.reset();
  } catch (error) {
    setStatus(error.message || "Could not send your enquiry. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

const projectDetailAssets = import.meta.glob(
  "./Assets/project-gallery/details/**/*.webp",
  { eager: true, import: "default" },
);
const projectCoverAssets = import.meta.glob("./Assets/project-gallery/*.webp", {
  eager: true,
  import: "default",
});
const workVideoAssets = import.meta.glob("./Assets/video/*.mp4", {
  eager: true,
  import: "default",
});
const projectGallery = (slug) =>
  Object.entries(projectDetailAssets)
    .filter(([path]) => path.includes(`/details/${slug === "akshay-builder" ? "factory" : slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => src);
const workVideos = [
  ["Smartview Interior Project 1", "Untitled-design-1.mp4"],
  ["Smartview Interior Project 2", "Untitled-design-2.mp4"],
  ["Smartview Interior Project 3", "Untitled-design-3.mp4"],
  ["Smartview Interior Project 4", "Untitled-design-6.mp4"],
  ["Workshop Walkthrough", "WhatsApp-Video-2025-01-24-at-4.21.00-PM.mp4"],
  [
    "Interior Project Walkthrough",
    "WhatsApp-Video-2025-01-24-at-4.22.11-PM.mp4",
  ],
].map(([title, file]) => [title, workVideoAssets[`./Assets/video/${file}`]]);

const image = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <NotFoundPage title="Something went wrong" />;
    return this.props.children;
  }
}

function NotFoundPage({ title = "Page not found" }) {
  return (
    <SiteShell active="">
      <PageHero title={title} />
      <section className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2 className="section-title">We couldn’t find that page.</h2>
        <p>The page may have moved, or the address may be incorrect.</p>
        <a className="button" href="/">Return to Home</a>
      </section>
    </SiteShell>
  );
}

const routeSeo = {
  "/": ["Interior Design in Chennai | Smartview Interior", "Thoughtful home, kitchen and workspace interiors in Chennai, designed and crafted by Smartview Interior."],
  "/about-us": ["About Smartview Interior | Chennai Interior Designers", "Meet the Smartview Interior team and learn about our interior design and wooden manufacturing work in Chennai."],
  "/services": ["Interior Design & Modular Kitchen Services | Smartview", "Explore Smartview Interior’s modular kitchens, commercial interiors, wooden manufacturing, design and renovation services."],
  "/projects": ["Interior Design Projects | Smartview Interior Chennai", "Browse completed residential and commercial interior projects by Smartview Interior."],
  "/contact-us": ["Contact Smartview Interior | Chennai", "Contact Smartview Interior in Alapakkam, Chennai to discuss your interior design or renovation project."],
  "/privacy-policy": ["Privacy Policy | Smartview Interior", "Read how Smartview Interior handles information submitted through this website."],
};

function updateSeo(path, project) {
  const base = "https://smartviewinterior.com";
  const exists = Boolean(project || routeSeo[path]);
  const title = project ? `${project.title} | Smartview Interior` : (routeSeo[path]?.[0] || "Page not found | Smartview Interior");
  const description = project ? `View the ${project.title} interior project by Smartview Interior.` : (routeSeo[path]?.[1] || "The requested page could not be found.");
  document.title = title;
  const put = (selector, attr, key, value) => {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement(selector.startsWith("meta") ? "meta" : "link"); document.head.appendChild(node); }
    node.setAttribute(attr, key); node.setAttribute("content", value);
  };
  put('meta[name="description"]', "name", "description", description);
  put('meta[name="robots"]', "name", "robots", exists ? "index,follow" : "noindex,follow");
  const canonical = document.head.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement("link"));
  canonical.rel = "canonical"; canonical.href = `${base}${path === "/" ? "/" : path}`;
  [["og:title", title], ["og:description", description], ["og:type", "website"], ["og:url", canonical.href], ["og:image", `${base}/favicon.webp`], ["twitter:card", "summary_large_image"], ["twitter:title", title], ["twitter:description", description], ["twitter:image", `${base}/favicon.webp`]].forEach(([property, content]) => {
    let node = document.head.querySelector(`meta[property="${property}"],meta[name="${property}"]`);
    if (!node) { node = document.createElement("meta"); node.setAttribute(property.startsWith("twitter:") ? "name" : "property", property); document.head.appendChild(node); }
    node.content = content;
  });
  const business = { "@context": "https://schema.org", "@type": "LocalBusiness", additionalType: "https://schema.org/InteriorDesigner", name: "Smartview Interior", url: base, email: "smartviewinterior@gmail.com", telephone: "+91 73972 65883", address: { "@type": "PostalAddress", streetAddress: "No.15/A, G.K. Industrial Estate, Main Road, Arcot Road, Alapakkam", addressLocality: "Chennai", postalCode: "600116", addressCountry: "IN" } };
  const graph = [business, { "@context": "https://schema.org", "@type": "Organization", name: "Smartview Interior", url: base, email: "smartviewinterior@gmail.com" }, { "@context": "https://schema.org", "@type": "WebSite", name: "Smartview Interior", url: base }];
  if (path !== "/") graph.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: project?.title || routeSeo[path]?.[0]?.split("|")[0].trim() || "Not found", item: canonical.href }] });
  let jsonLd = document.getElementById("smartview-jsonld");
  if (!jsonLd) { jsonLd = document.createElement("script"); jsonLd.id = "smartview-jsonld"; jsonLd.type = "application/ld+json"; document.head.appendChild(jsonLd); }
  jsonLd.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
const navItems = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Services", "/services"],
  ["Our Projects", "/projects"],
  ["Work Videos", "/projects#our-work-videos"],
  ["Contact", "/contact-us"],
];
const services = [
  [
    "WOOD",
    "Wooden Manufacturing",
    "Experience the elegance of premium-quality wooden craftsmanship. From custom furniture to intricate woodwork, we deliver durable, stylish, and timeless pieces designed to elevate any space.",
  ],
  [
    "KITCHEN",
    "Modular Kitchen & Interior",
    "Transform your kitchen into a modern, functional, and stylish space. Our modular kitchen designs combine smart storage solutions with premium finishes, making your culinary experience effortless and delightful.",
  ],
  [
    "OFFICE",
    "Commercial Interior",
    "Enhance your business environment with professional and innovative interior solutions. From offices to retail spaces, we design interiors that boost productivity and leave a lasting impression.",
  ],
  [
    "DESIGN",
    "Interior Design & Services",
    "Bring your dream space to life with our expert interior design services. Our team works closely with you to conceptualize and customize designs that align with your vision and budget.",
  ],
  [
    "RENEW",
    "Renovation Works",
    "Bring a familiar space to life again with careful planning and quality workmanship.",
  ],
];
const makeProject = (title, slug, coverFile) => {
  const gallery = projectGallery(slug);
  return {
    title,
    slug,
    image:
      projectCoverAssets[`./Assets/project-gallery/${coverFile}`] ?? gallery[0],
    gallery,
  };
};
const projects = [
  makeProject("Sindhu Project", "sindhu-project", "7-11.webp"),
  makeProject("Sagar Site - Tambram", "sagar-site-tamabaram", "11-3.webp"),
  makeProject("Show Room - Pune", "show-room-pune", "2-15.webp"),
  makeProject(
    "Asan Site Office - Guindy",
    "asan-site-office-guindy",
    "4-12.webp",
  ),
  makeProject("1by2 Office - T.Nager", "1by2-office-t-nager", "5-11.webp"),
  makeProject("Srinivasan - Mylapore", "srinivasan-mylapore", "8-9.webp"),
  makeProject("Akshay Builder", "akshay-builder", "1-13.webp"),
  makeProject(
    "Shamala Site - Thoraipakkam",
    "shamala-site-thoraipakkam",
    "1-9.webp",
  ),
  makeProject(
    "MMPCL Pvt Company Office - Camp Road",
    "mmpcl-office-camp-road",
    "1-8.webp",
  ),
  makeProject(
    "MMPCL Pvt Company - Coimbatore",
    "mmpcl-company-coimbatore",
    "2-8.webp",
  ),
  makeProject(
    "Santhosh Site - Mahanathanapuram",
    "santhosh-site-mahanathanapuram",
    "2-7.webp",
  ),
  makeProject(
    "Madhan Site - Greens Road",
    "madhan-site-greens-road",
    "7-4.webp",
  ),
  makeProject("Mithun Site - Porur", "mithun-site-porur", "9-3.webp"),
  makeProject("Asan - Royapettah Site", "asan-royapettah-site", "2-4.webp"),
];

function Header({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="header-brand" href="/" aria-label="Smartview Interior home">
          <img src={brandLogo} alt="Smartview Interior" />
        </a>
        <nav className="nav">
          {navItems.map(([title, href]) => (
            <a
              className={active === href ? "active" : ""}
              key={title}
              href={href}
            >
              {title}
            </a>
          ))}
        </nav>
        <a className="button" href="/contact-us">
          Contact Now
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`mobile-nav ${open ? "open" : ""}`}
          id="mobile-navigation"
        >
          {navItems.map(([title, href]) => (
            <a key={title} href={href} onClick={() => setOpen(false)}>
              {title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const [footerFormStatus, setFooterFormStatus] = useState("");
  const [footerFormSubmitting, setFooterFormSubmitting] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <a className="footer-brand" href="/" aria-label="Smartview Interior home">
              <img src={brandLogo} alt="Smartview Interior" loading="lazy" decoding="async" />
            </a>
            <p>
              Since 2014, Smartview Interior has been crafting inspiring spaces
              with expertise in wooden manufacturing, modular kitchens and
              interior design. Based in Alapakkam, Chennai, we bring your vision
              to life.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              {navItems.map(([title, href]) => (
                <a href={href} key={title}>
                  {title}
                </a>
              ))}
              {/* <a href="/privacy-policy">Privacy Policy</a> */}
            </div>
          </div>
          <div className="footer-contact">
            <h3>Contact Info</h3>
            <p>
              <span className="footer-contact-icon-frame">
                <img className="footer-contact-icon" src={emailIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <span>smartviewinterior@gmail.com</span>
            </p>
            <p>
              <span className="footer-contact-icon-frame">
                <img className="footer-contact-icon" src={phoneIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <span>
                +91 73972 65883
                <br />
                +91 86676 64766
              </span>
            </p>
            <p>
              <span className="footer-contact-icon-frame">
                <img className="footer-contact-icon" src={pinIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <span>
                No.15/A, G.K. Industrial Estate,
                <br />
                Main Road, Arcot Road,
                <br />
                Alapakkam, Chennai-600116.
              </span>
            </p>
          </div>
          <div className="footer-newsletter">
            <h3>Let's keep in touch</h3>
            <p>
              Have a project in mind? Send us your details and our team will get
              back to you.
            </p>
            <form
              className="footer-form"
              action="https://formsubmit.co/ajax/smartviewinterior@gmail.com"
              method="POST"
              onSubmit={(event) => submitFormToFormSubmit(event, setFooterFormStatus, setFooterFormSubmitting)}
            >
              <input type="hidden" name="_subject" value="New website enquiry - footer" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <input required name="name" placeholder="Name" aria-label="Name" />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
              />
              <button className="button" type="submit" disabled={footerFormSubmitting}>
                {footerFormSubmitting ? "Sending..." : "Send"}
              </button>
              {footerFormStatus && <p className="form-submit-status" role="status">{footerFormStatus}</p>}
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            Copyright (c) 2026 Smartview Interior. | Developed by <a href="https://sagegfx.com/" target="_blank" rel="noopener noreferrer">SageGFX Digital Solutions.</a>
           
          </span>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

function PageHero({ title }) {
  return (
    <section className="page-hero">
      <div>
        <h1>{title}</h1>
        <div className="breadcrumbs">
          <a href="/">Home</a> &gt; {title.replace(" Us", "")}
        </div>
      </div>
    </section>
  );
}

function SiteShell({ active, children, homeFooterInside = false }) {
  const isHomePage = active === "/";
  return (
    <>
      <Header active={active} />
      <div
        className={
          isHomePage
            ? "home-page-stage"
            : active === "/privacy-policy"
              ? "privacy-page-stage"
              : "site-page-stage"
        }
      >
        <main>
          {children}
          {isHomePage && !homeFooterInside && <Footer />}
        </main>
        {!isHomePage && <Footer />}
      </div>
      <a
        className="whatsapp"
        href="https://wa.me/917397265883"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16 3.5a12.5 12.5 0 0 0-10.7 19L3.5 28.5l6.2-1.6A12.5 12.5 0 1 0 16 3.5Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M11.7 9.4c-.5-.6-1.1-.5-1.5-.1-.8.7-1.5 1.6-1.4 2.7.1 1.5 1.5 3.4 3.1 5.2 1.7 1.8 3.8 3.1 5.4 3.3 1.1.1 2.1-.6 2.8-1.3.4-.4.4-1 0-1.5l-1.7-1.4c-.4-.3-.8-.3-1.2.1l-.7.8c-.2.2-.5.3-.8.1-1.3-.6-2.3-1.6-3-2.8-.2-.3-.2-.6.1-.8l.7-.7c.4-.4.4-.8.1-1.2l-1.6-1.6Z" />
        </svg>
      </a>
    </>
  );
}
function WorkVideosSection() {
  return (
    <section className="work-video" id="our-work-videos">
      <div className="container">
        <div className="center">
          <div className="section-kicker">A CLOSER LOOK</div>
          <h2 className="section-title">Our Work Videos</h2>
        </div>
        <div className="video-grid">
          {workVideos.map(([title, src]) => (
            <article className="video-card" key={title}>
              <video
                controls
                muted
                preload="none"
                playsInline
                aria-label={title}
                onMouseEnter={(event) =>
                  event.currentTarget.play().catch(() => {})
                }
                onMouseLeave={(event) => event.currentTarget.pause()}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const reasons = [
    [
      threeD,
      "3D Visualisation",
      "Experience your dream space before it’s built with our realistic 3D visualization, ensuring every detail is perfect.",
    ],
    [
      warranty,
      "10 Years Warranty",
      "Enjoy long-term peace of mind with our 10-year warranty, guaranteeing quality and durability in every project.",
    ],
    [
      projectsIcon,
      "700+ Projects",
      "With 7000+ successful projects, we bring expertise, innovation, and precision to every design we create.",
    ],
    [
      planning,
      "Architecture Planning",
      "Our expert architectural planning ensures smart space utilization, functionality, and aesthetic appeal.",
    ],
    [
      support,
      "24/7 Support",
      "We are here for you round the clock with 24/7 support, ensuring seamless service whenever you need it.",
    ],
    [
      consultation,
      "Free Consultation",
      "Get expert guidance with our free consultation, helping you shape your dream space with confidence.",
    ],
  ];
  const people = [
    ["Narayana Aachari (Late)", "Founder", founderTeamImage],
    ["Sundar Narayanan", "Director", sundarTeamImage],
    ["Kavitha Vijayakumar", "Director", kavithaTeamImage],
  ];
  return (
    <SiteShell active="/" homeFooterInside>
      <section className="hero">
        <div className="hero-slideshow" aria-hidden="true">
          <img className="hero-slide hero-slide-one" src={modernLivingHero} alt="" />
          <img className="hero-slide hero-slide-two" src={beautifulKitchenHero} alt="" />
          <img className="hero-slide hero-slide-three" src={whatsappKitchenHero} alt="" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">Thoughtful interiors, made for you</div>
            <h1>
              Your Vision.
              <br />
              Our Expertise.
            </h1>
            <p>
              Transforming homes and workspaces with beautiful interiors, made
              with care and built around the way you live.
            </p>
            <div className="hero-actions">
              <a className="button" href="/contact-us">
                Discover Your Dream Home
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container home-intro">
        <div className="intro-copy">
          <div className="section-kicker">WELCOME TO SMARTVIEW</div>
          <h2 className="section-title">
            Smartview Interior: Crafting Your Dream Spaces
          </h2>
          <p className="copy">
            At Smartview Interior, we've been redefining interiors since 2014
            with our expertise in wooden manufacturing, modular kitchens,
            commercial interiors, and bespoke designs. Based in Arcot Road,
            Alapakkam, Chennai, our journey is led by founder S. Narayanan
            (Aachari), with the support of directors Sundar Narayanan and
            Kavitha Vijaykumar.
          </p>
          <p className="copy">
            We are passionate about blending creativity, quality and
            functionality to design spaces that inspire. Whether it is a home or
            commercial project, trust us to bring your vision to life with
            precision and style.
          </p>
          <a className="text-link" href="/about-us">
            More about Smartview
          </a>
        </div>
        <div className="intro-image">
          <img src={introImageThree} alt="Warm dining and living interior" loading="lazy" decoding="async" />
          <img src={introImageFour} alt="Custom wood kitchen cabinetry" loading="lazy" decoding="async" />
          <img src={introImageFive} alt="Contemporary teal living room" loading="lazy" decoding="async" />
        </div>
      </section>
      <div className="home-scroll-content">
        <section className="services">
          <div className="container">
            <div className="services-head">
              <div className="section-kicker">THOUGHTFUL FROM THE START</div>
              <h2 className="section-title inverse">Our Services</h2>
              <p>
                Innovative designs, timeless elegance - that's Smartview
                Interior!
              </p>
            </div>
            <div className="service-grid">
              {services.slice(0, 4).map(([icon, title, desc]) => (
                <a href="/services" className="service-card" key={title}>
                  <span className="service-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section
          className="feature-band"
          aria-label="A completed Smartview living room"
        />
        <section className="offer-section">
          <div className="container offer-layout">
            <div className="offer-photo">
              <div>
                <span>OUR APPROACH</span>
                <h2>
                  What We Offer
                  <br />
                  At SmartView
                </h2>
              </div>
            </div>
            <div className="offer-list">
              {[
                "Modular Kitchen & Wardrobe",
                "Renovation Works",
                "Customized Interior Designing",
                "Light Fitting",
                "False Ceiling",
                "Flooring",
                "Electrical Work",
                "Civil Work",
                "Wall Painting and Wall Paper",
              ].map((item, index) => (
                <div className="offer-item" key={item}>
                  <span>0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="offer-list offer-list-secondary">
              <article className="offer-benefit">
                <span className="offer-benefit-icon">10</span>
                <div>
                  <h3>10-Year Policy on Modular Products</h3>
                  <p>
                    Enjoy peace of mind with our{" "}
                    <strong>10-year warranty</strong> on modular products,
                    ensuring durability and long-lasting quality.
                  </p>
                </div>
              </article>
              <article className="offer-benefit">
                <span className="offer-benefit-icon">1</span>
                <div>
                  <h3>1-Year On-Site Free Service</h3>
                  <p>
                    We offer <strong>1 year of free on-site service</strong>,
                    providing hassle-free maintenance and support for your
                    interiors.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="why">
          <div className="container">
            <div className="center">
              <div className="section-kicker">THE SMARTVIEW DIFFERENCE</div>
              <h2 className="section-title">Why Choose Us?</h2>
            </div>
            <div className="why-grid">
              {reasons.map(([icon, title, desc]) => (
                <div className="why-card" key={title}>
                  <img src={icon} alt="" loading="lazy" decoding="async" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="certifications">
          <div className="container certification-stack">
            <article className="certification-row">
              <h2>ISO Certified</h2>
              <div className="certification-content">
                <div className="cert-copy">
                  <h3>
                    Smartview Interior - ISO 9001:2015 Certified for Quality
                    Excellence
                  </h3>
                  <p>
                    At Smartview Interior, we take pride in delivering
                    top-quality modular wooden works, modular kitchens, and
                    cabinets. Our commitment to excellence is reinforced by our
                    ISO 9001:2015 Quality Management System Certification,
                    awarded by Otabu Certification Pvt. Ltd.
                  </p>
                  <p>
                    This certification ensures that our processes meet
                    international quality standards, reflecting our dedication
                    to precision, innovation, and customer satisfaction.
                  </p>
                  <p>
                    Choose Smartview Interior for trusted, certified,
                    high-quality interior solutions.
                  </p>
                </div>
                <img
                  className="certification-image"
                  src={isoCertificateImage}
                  alt="Smart View Interior ISO 9001:2015 certificate"
                  loading="lazy"
                />
              </div>
            </article>
            <article className="certification-row certification-row-reverse">
              <h2>BIFMA Certified</h2>
              <div className="certification-content">
                <img
                  className="certification-image"
                  src={bifmaCertificateImage}
                  alt="Smart View Interior ANSI/BIFMA E3-2012 certificate"
                  loading="lazy"
                />
                <div className="cert-copy">
                  <h3>
                    Smart View Interior - BIFMA Certified for Quality and
                    Excellence
                  </h3>
                  <p>
                    At Smart View Interior, we are committed to delivering
                    top-notch interior designing, decoration, and wood
                    manufacturing services. We are proud to be ANSI/BIFMA
                    E3-2012 certified, ensuring that our products and services
                    meet high standards for quality, durability, and
                    sustainability.
                  </p>
                  <p>
                    This certification reflects our dedication to superior
                    residential and commercial interiors across offices, banks,
                    showrooms, and hospitals. We follow recognized best
                    practices in furniture design, safety, and environmental
                    responsibility.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>{" "}
        <section className="projects" id="projects">
          <div className="container">
            <div className="projects-head">
              <div>
                <div className="section-kicker">A FEW RECENT SPACES</div>
                <h2 className="section-title">Our Projects</h2>
              </div>
              <a className="text-link" href="/contact-us">
                Plan a project with us
              </a>
            </div>
            <div className="project-grid">
              {projects.map(({ title, image: projectImage, slug }) => (
                <a className="project" href={`/projects/${slug}`} key={slug}>
                  <img src={projectImage} alt={title} loading="lazy" />
                  <div className="project-info">
                    <h3>{title}</h3>
                    <span>View project</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="brand-story">
          <div className="container brand-story-inner">
            <div>
              <div className="section-kicker">MADE WITH PRIDE IN CHENNAI</div>
              <h2>
                Paradise Interior - A Proud Sister Brand of Smart View Interior
              </h2>
              <p>
                Paradise Interiors, the esteemed sister concern of Smart View
                Interiors, is dedicated to delivering high-quality, innovative,
                and aesthetically pleasing interior solutions. With a shared
                vision of excellence, both companies work together to transform
                spaces into elegant, functional, and inspiring environments. Our
                commitment to superior craftsmanship, attention to detail, and
                client-centric approach ensures that every project reflects
                sophistication and style.
              </p>
              <a className="button light" href="/contact-us">
                Talk to our team
              </a>
            </div>
            <img
              src={image("photo-1600210492486-724fe5c67fb0", 800)}
              alt="A completed Smartview Interior project"
              loading="lazy"
            />
          </div>
        </section>
        <section className="team">
          <div className="container">
            <div className="center">
              <div className="section-kicker">THE PEOPLE BEHIND THE WORK</div>
              <h2 className="section-title">Team Smartview</h2>
            </div>
            <div className="team-grid">
              {people.map(([name, role, src]) => (
                <div className="team-card" key={name}>
                  <img src={src} alt={`${name} - ${role}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </SiteShell>
  );
}
function AboutPage() {
  return (
    <SiteShell active="/about-us">
      <PageHero title="About Us" />
      <section className="container about-story">
        <div>
          <div className="section-kicker">SMARTVIEW INTERIORS</div>
          <h2 className="section-title">
            Transforming spaces,
            <br />
            crafting experiences.
          </h2>
          <p className="copy">
            At <strong>Smartview Interior</strong>, we've been redefining
            interiors since 2014 with our expertise in wooden manufacturing,
            modular kitchens, commercial interiors, and bespoke designs. Based
            in Arcot Road, Alapakkam, Chennai, our journey is led by founder{" "}
            <strong>S. Narayanan (Aachari)</strong>, with the support of
            directors <strong>Sundar Narayanan</strong> and
            <strong>Kavitha Vijaykumar</strong>.
          </p>
          <p className="copy">
            We are passionate about blending creativity, quality and
            functionality to design spaces that inspire. Whether it's a home or
            commercial project, trust us to bring your vision to life with
            precision and style.
          </p>
        </div>
        <img
          className="about-photo"
          src={aboutImage}
          alt="Smartview Interior workshop and studio"
          loading="lazy"
        />
      </section>
      <section className="gallery">
        <div className="container">
          <div className="center">
            <div className="section-kicker">A PLACE TO CREATE</div>
            <h2 className="section-title">Our work space.</h2>
          </div>
          <div className="gallery-grid">
            {[
              workspaceImage1,
              workspaceImage2,
              workspaceImage3,
              workspaceImage4,
              workspaceImage5,
              workspaceImage6,
              workspaceImage7,
              workspaceImage8,
            ].map((src, index) => (
              <img
                src={src}
                alt="Smartview Interior studio"
                loading="lazy"
                key={`workspace-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="cta-strip">
        <div className="container">
          <h2>
            Tailored designs that fit your style and needs. Let's get started
            today!
          </h2>
          <a className="button" href="/contact-us">
            Tell us about your project
          </a>
        </div>
      </section>
    </SiteShell>
  );
}

const serviceDetails = [
  [
    "Wooden Manufacturing",
    "Experience the elegance of premium-quality wooden craftsmanship. From custom furniture to intricate woodwork, we deliver durable, stylish and timeless pieces designed to elevate any space.",
    serviceImageWood,
  ],
  [
    "Modular Kitchen & Interior",
    "Transform your kitchen into a modern, functional and stylish space. Our modular kitchen designs bring smart storage together with premium finishes.",
    serviceImageKitchen,
  ],
  [
    "Commercial Interior",
    "Enhance your business environment with professional and innovative interior solutions. From offices to retail spaces, we design interiors that boost productivity and make a lasting impression.",
    serviceImageCommercial,
  ],
  [
    "Interior Design & Services",
    "Bring your dream space to life with our expert interior design services. Our team works closely with you to conceptualize and customize designs that align with your vision and budget.",
    serviceImageDesign,
  ],
  [
    "Renovation Works",
    "From structural modifications to complete design overhauls, we ensure every renovation project is executed with precision and craftsmanship.",
    serviceImageRenovation,
  ],
];
function ServicesPage() {
  return (
    <SiteShell active="/services">
      <PageHero title="Our Services" />
      <section className="service-page-intro">
        <div className="container">
          <div className="section-kicker">THOUGHTFUL FROM THE START</div>
          <h2 className="section-title inverse">
            Smartview Interior - Your one-stop solution for all things
            interiors!
          </h2>
        </div>
      </section>
      <section className="service-showcase">
        {serviceDetails.map(([title, desc, id], index) => (
          <article className="showcase-row" key={title}>
            <div className="showcase-image">
              <img src={id} alt={title} loading="lazy" decoding="async" />
            </div>
            <div className="showcase-copy">
              <h2>
                {index + 1}. {title}
              </h2>
              <p>{desc}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="cta-strip">
        <div className="container">
          <h2>Ready to make a little more room for what matters?</h2>
          <a className="button" href="/contact-us">
            Consult Now
          </a>
        </div>
      </section>
    </SiteShell>
  );
}

function PrivacyPolicyPage() {
  return (
    <SiteShell active="/privacy-policy">
      <PageHero title="Privacy Policy" />
      <section className="privacy-policy-section">
        <div className="privacy-policy-layout">
        <article className="privacy-policy-content">
          <p className="privacy-policy-meta">
            Smartview Interior &copy; Last updated October 1, 2026
          </p>
          <h2>Who we are</h2>
          <p>
            Smartview Interior provides interior design, modular kitchen,
            furniture and wooden manufacturing services in Chennai. Our website
            address is <a href="https://smartviewinterior.com">https://smartviewinterior.com</a>.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you contact us or request a consultation, we may collect your
            name, email address, phone number and the details you share about
            your project. We use this information to respond to your enquiry and
            provide our services.
          </p>

          <h2>Comments and website use</h2>
          <p>
            If comments or other interactive features are enabled, information
            submitted in those forms may be stored along with technical details
            such as your IP address and browser type to help prevent spam and
            misuse.
          </p>

          <h2>Media and cookies</h2>
          <p>
            If you upload images, avoid including embedded location data. Our
            website may use essential cookies to support site features and
            remember preferences. You can control cookies through your browser
            settings.
          </p>

          <h2>Embedded content</h2>
          <p>
            Pages may include content from other websites, such as maps or
            videos. Embedded content behaves as if you visited that website,
            which may collect data or use cookies according to its own privacy
            policy.
          </p>

          <h2>How we use and share your information</h2>
          <p>
            We use enquiry details to communicate with you, prepare project
            information and deliver requested services. We do not sell your
            personal information. We share it only with service providers when
            needed to operate our website or respond to your request, or when
            required by law.
          </p>

          <h2>How long we retain your information</h2>
          <p>
            We keep enquiry records only for as long as needed to manage our
            relationship with you, provide services and meet applicable legal
            or accounting requirements.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us for a copy of the personal information you have
            provided, request corrections, or ask us to delete it where we are
            not required to retain it. To make a request, contact us at{" "}
            <a href="mailto:smartviewinterior@gmail.com">smartviewinterior@gmail.com</a>.
          </p>

          <h2>Where your information is processed</h2>
          <p>
            Website submissions may be checked by automated spam detection and
            processed by the service providers needed to operate this website.
          </p>
        </article>
        <aside className="privacy-sidebar">
          <section className="privacy-widget">
            <h2>Search</h2>
            <form action="/" method="get">
              <input type="search" name="s" placeholder="Search here" aria-label="Search" />
              <button type="submit" aria-label="Submit search">Search</button>
            </form>
          </section>
          <section className="privacy-widget">
            <h2>Recent Posts</h2>
            <a href="/">Thoughtful interior design for modern living</a>
            <a href="/projects">A look at our latest interior projects</a>
            <a href="/services">Planning a modular kitchen</a>
          </section>
          <section className="privacy-widget">
            <h2>Categories</h2>
            <a href="/services">Interior Design</a>
            <a href="/services">Creative Planning</a>
            <a href="/projects">Project Updates</a>
            <a href="/services">Renovation</a>
          </section>
          <section className="privacy-widget">
            <h2>Get in touch</h2>
            <p>Have a project in mind? Our team would be happy to help.</p>
            <a href="/contact-us">Contact Smartview Interior ?</a>
          </section>
        </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function ProjectsPage() {
  useEffect(() => {
    if (window.location.hash === "#our-work-videos") {
      requestAnimationFrame(() =>
        document
          .getElementById("our-work-videos")
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    }
  }, []);
  return (
    <SiteShell active="/projects">
      <PageHero title="Our Projects" />
      <section className="projects projects-page">
        <div className="container">
          <div className="projects-head">
            <div>
              <div className="section-kicker">SPACES MADE FOR REAL LIFE</div>
              <h2 className="section-title">A selection of our work</h2>
            </div>
            {/* <a className="text-link" href="/contact-us">Plan a project with us</a> */}
          </div>
          <div className="project-grid">
            {projects.map(({ title, image: projectImage, slug }) => (
              <a className="project" href={`/projects/${slug}`} key={slug}>
                <img src={projectImage} alt={title} loading="lazy" />
                <div className="project-info">
                  <h3>{title}</h3>
                  <span>View More</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <WorkVideosSection />
    </SiteShell>
  );
}
function ProjectDetailPage({ project }) {
  return (
    <SiteShell active="/projects">
      <PageHero title={project.title} />
      <section className="project-detail-section">
        <div className="container">
          <a className="project-back-link" href="/projects">
            &larr; All Projects
          </a>
          <div className="project-detail-heading">
            <div className="section-kicker">SMARTVIEW INTERIOR PROJECT</div>
            <h2 className="section-title">{project.title}</h2>
          </div>
          <div
            className={`project-detail-gallery project-gallery-${project.slug}`}
          >
            {project.gallery.map((src, index) => (
              <figure key={`${project.slug}-${index}`}>
                <img
                  src={src}
                  alt={`${project.title} - project view ${index + 1}`}
                  loading={index > 1 ? "lazy" : "eager"}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
function ContactPage() {
  const [contactFormStatus, setContactFormStatus] = useState("");
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);
  return (
    <SiteShell active="/contact-us">
      <PageHero title="Contact Us" />
      <section className="contact-cards">
        <div className="container">
          <h2 className="section-title">Get in touch with us.</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <span aria-hidden="true">
                <img src={phoneIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <h3>Call us</h3>
              <p>
                <a href="tel:+917397265883">+91 73972 65883</a>
                <br />
                <a href="tel:+918667664766">+91 86676 64766</a>
              </p>
            </div>
            <div className="contact-card">
              <span aria-hidden="true">
                <img src={emailIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <h3>Email us</h3>
              <p>
                <a href="mailto:smartviewinterior@gmail.com">
                  smartviewinterior@gmail.com
                </a>
              </p>
            </div>
            <div className="contact-card">
              <span aria-hidden="true">
                <img src={pinIcon} alt="" loading="lazy" decoding="async" />
              </span>
              <h3>Visit us</h3>
              <p>
                No.15/A, G.K. Industrial Estate,
                <br />
                Main Road, Arcot Road, Alapakkam,
                <br />
                Chennai-600116.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            <div className="form-wrap">
              <div className="section-kicker">LET'S MAKE IT HAPPEN</div>
              <h2>Tell us about your project.</h2>
              <p>
                Share a few details and our team will be in touch to talk
                through your project.
              </p>
              <form
                className="main-form"
                action="https://formsubmit.co/ajax/smartviewinterior@gmail.com"
                method="POST"
                onSubmit={(event) => submitFormToFormSubmit(event, setContactFormStatus, setContactFormSubmitting)}
              >
                <input type="hidden" name="_subject" value="New website enquiry - contact page" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
                <div className="form-grid">
                  <label className="field">
                    First name *
                    <input required name="firstName" placeholder="First name" />
                  </label>
                  <label className="field">
                    Last name *
                    <input required name="lastName" placeholder="Last name" />
                  </label>
                  <label className="field full">
                    Email *
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="field full">
                    Mobile number *
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </label>
                  <label className="field full">
                    What are you looking for? *
                    <select required name="service">
                      <option value="">Select a service</option>
                      {services.map(([, title]) => (
                        <option key={title}>{title}</option>
                      ))}
                    </select>
                  </label>
                  <label className="field full">
                    A little about your project
                    <textarea
                      name="message"
                      placeholder="Tell us about the space, your ideas, or your timeline"
                    />
                  </label>
                  <div className="field full">
                    <button className="button" type="submit" disabled={contactFormSubmitting}>
                      {contactFormSubmitting ? "Sending..." : "Send your enquiry"}
                    </button>
                  </div>
                  {contactFormStatus && <p className="form-submit-status field full" role="status">{contactFormStatus}</p>}
                </div>
              </form>
            </div>
            <aside className="map-panel">
              <div className="map-heading">
                <span className="section-kicker">VISIT SMARTVIEW</span>
                <h3>Find our studio</h3>
                <p>
                  No.15/A, G.K. Industrial Estate, Main Road, Arcot Road,
                  Alapakkam, Chennai-600116.
                </p>
              </div>
              <iframe
                title="Map showing Smartview Interior in Alapakkam, Chennai"
                src="https://maps.google.com/maps?q=No.15%2FA%2C%20G.K.%20Industrial%20Estate%2C%20Main%20Road%2C%20Arcot%20Road%2C%20Alapakkam%2C%20Chennai%20600116&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export default function App() {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, "") || "/";
  const detailMatch = path.match(/^\/projects\/([^/]+)$/);
  const selectedProject = detailMatch
    ? projects.find((project) => project.slug === detailMatch[1].toLowerCase())
    : null;

  useEffect(() => updateSeo(path, selectedProject), [path, selectedProject]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const motionTargets = document.querySelectorAll(
      ".page-hero > div, .hero-content, .home-intro > *, .services-head, .service-card, .offer-layout > *, .why-card, .certification-row, .project, .showcase-row, .cta-strip > .container, .about-story > *, .gallery-grid img, .contact-card, .contact-layout > *, .team-card, .privacy-policy-content, .privacy-sidebar, .footer-grid > *",
    );
    if (!motionTargets.length) return;

    motionTargets.forEach((element, index) => {
      element.classList.add("motion-item");
      element.style.setProperty("--motion-delay", `${(index % 4) * 65}ms`);
      if (element.matches(".team-card, .showcase-row")) {
        const siblingIndex = Array.from(element.parentElement.children).indexOf(element);
        element.classList.add(siblingIndex % 2 === 0 ? "motion-from-left" : "motion-from-right");
      }
    });
    document.documentElement.classList.add("motion-enabled");

    if (!("IntersectionObserver" in window)) {
      motionTargets.forEach((element) => element.classList.add("motion-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    motionTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (detailMatch) return selectedProject ? <ProjectDetailPage project={selectedProject} /> : <NotFoundPage />;
  switch (path) {
    case "/about-us":
      return <AboutPage />;
    case "/services":
      return <ServicesPage />;
    case "/projects":
      return <ProjectsPage />;
    case "/contact-us":
      return <ContactPage />;
    case "/privacy-policy":
      return <PrivacyPolicyPage />;
    default:
      return routeSeo[path] ? <HomePage /> : <NotFoundPage />;
  }
}
