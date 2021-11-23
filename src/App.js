import React from "react";
import "./App.css";
import Navbar from "./layouts/Navbar/Navbar";
import badgesImg from "assets/images/badges-img.webp";
import LinkBtn from "components/LinkBtn/LinkBtn";
import company1 from "assets/images/company-1.webp";
import company2 from "assets/images/company-2.webp";
import company3 from "assets/images/company-3.webp";
import company4 from "assets/images/company-4.webp";
import company5 from "assets/images/company-5.webp";
import company6 from "assets/images/company-6.webp";
import SideBySideSection from "components/SideBySideSection/SideBySideSection";
import platformImg from "assets/images/platform-img.webp";
import integrationImg from "assets/images/integration-img.webp";
import resourcesImg1 from "assets/images/resources-img-1.webp";
import resourcesImg2 from "assets/images/resources-img-2.webp";
import resourcesImg3 from "assets/images/resources-img-3.webp";
import resourcesImg4 from "assets/images/resources-img-4.webp";
import ResourcesCard from "components/ResourcesCard/ResourcesCard";
import List from "components/List/List";
import bCorpImg from "assets/images/b-corp-img.svg";
import pledgeImg from "assets/images/pledge.svg";

import { ReactComponent as TwitterIcon } from "assets/images/twitterIcon.svg";
import { ReactComponent as FacebookIcon } from "assets/images/facebook-icon.svg";
import { ReactComponent as LinkdenIcon } from "assets/images/linkden-icon.svg";

import liveChatImg from "assets/images/live-chat.webp";
import inboxImg from "assets/images/inbox.webp";
import helpCenterImg from "assets/images/help-center.webp";
import heartImg from "assets/images/heart.webp";

import papersImg from "assets/images/papers.webp";
import hammerImg from "assets/images/hammer.webp";
import analyticsImg from "assets/images/analytics.webp";
import puzzelImg from "assets/images/puzzel.webp";

import ringLogo from "assets/images/ring-logo.webp";

import signImg from "assets/images/sign.png";
import SupportCard from "components/SupportCard/SupportCard";
import ToolTip from "components/ToolTip/ToolTip";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-90px">
        <div className="container-wrapper">
          <div className="section">
            <div className="section-left">
              <p className="fs-48px graphik-semibold darkest-blue mb-20px">
                Customer support for growing businesses
              </p>
              <p className="fs-21px darkest-blue lh-2 mb-35px">
                Simple to start, powerful to grow, and proven to build better
                customer relationships.
              </p>

              <div className="hero-input-wrapper mb-35px">
                <input type="text" placeholder="Work Email*" />
                <button className="button-wrapper bg-sharp-blue white fs-18px graphik-medium radius-4px pointer">
                  Try for free
                </button>
              </div>

              <div className="hero-badges">
                <div className="hero-badges-left">
                  <img src={badgesImg} alt="" />
                </div>
                <div className="hero-badges-right">
                  <p className="darkest-blue fs-15px graphik-medium">
                    Larger team?
                  </p>
                  <LinkBtn title="Get A Demo" />
                </div>
              </div>
            </div>
            <div className="section-right">
              <video
                autoplay=""
                height="auto"
                className="hero-video"
                loop=""
                muted=""
                playsinline=""
                poster="https://hs-marketing.imgix.net/images/videos/video--share-email.png?auto=compress&amp;fit=scale&amp;dpr=1"
                preload="auto"
                width="100%"
              >
                <source
                  src="/static/video--share-email-5d8c14f7960c2e52c5febacf0bb4bb2e.webm"
                  type="video/webm"
                ></source>
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="companies">
          <p className="text-center fs-24px dark-blue mb-40px">
            Trusted by more than 12,000 businesses in 140 countries.
          </p>

          <div className="companies-images">
            <img src={company1} alt="" />
            <img src={company2} alt="" />
            <img src={company3} alt="" />
            <img src={company4} alt="" />
            <img src={company5} alt="" />
            <img src={company6} alt="" />
          </div>
        </div>
      </div>

      <div className="container-wrapper">
        <p className="cards-title fs-36px text-center graphik-medium darkest-blue">
          What you can do with Help Scout
        </p>
      </div>
      <SideBySideSection
        headline="Platform"
        title="Every support tool you need, out of the box"
        subtitle="With features like shared email, live chat, knowledge base, reports, and much more, Help Scout gives growing companies the flexibility and visibility to support customers at scale."
        linkTitle="How it works"
        identity={true}
        img={platformImg}
      />
      <SideBySideSection
        headline="Integrations"
        title="Connect the tools you already use"
        subtitle="Explore 50+ integrations that make your day-to-day workflow more efficient and familiar. Our extensive developer tools might also strike your fancy"
        linkTitle="See all Integrations"
        img={integrationImg}
      />

      <div className="support-wrapper">
        <div className="container-wrapper">
          <div className="support-titles ">
            <p className="text-center fs-36px graphik-medium darkest-blue mb-25px">
              A complete support solution
            </p>
            <p className="fs-18px light-blue text-center lh-2 graphik-regular ">
              Email, self-service, live chat, and proactive support, customer
              data, 50+ integrations, and customizable reports — Help Scout
              comes with everything you need to deliver a great customer
              experience.
            </p>
          </div>
        </div>

        <div className="product-overview">
          <div className="canvas-wrapper">
            <div className="canvas">
              <div className="ring ring-outer-1"></div>
              <div className="ring ring-outer-2"></div>
              <div class="ring inner-ring-1"></div>
              <div class="ring inner-ring-2"></div>
              <div class="ring inner-ring-3"></div>

              <SupportCard
                tooltipTo="top"
                img={liveChatImg}
                className="live-chat bg-ring-green"
              >
                Live <br /> Chat
              </SupportCard>
              <SupportCard
                tooltipTo="bottom"
                img={inboxImg}
                className="bg-ring-pink shared-inbox"
              >
                SHARED
                <br /> INBOX
              </SupportCard>
              <SupportCard
                tooltipTo="bottom"
                img={helpCenterImg}
                className="bg-ring-blue help-center"
              >
                HELP
                <br />
                CENTER
              </SupportCard>
              <SupportCard
                tooltipTo="top"
                img={heartImg}
                className="proactive bg-ring-purple"
              >
                PROACTIVE <br /> MESSAGES
              </SupportCard>

              <div className="customer-data">
                <ToolTip to="top">
                  <div className="ring-inner-content ">
                    <img src={papersImg} className="mb-15px" alt="" />
                    <p className="uppercase fs-10px light-blue text-center graphik-medium lh-2">
                      CUSTOMER
                      <br />
                      DATA
                    </p>
                  </div>
                </ToolTip>
              </div>

              <div className="tools">
                <ToolTip to="top">
                  <div className="ring-inner-content ">
                    <img src={hammerImg} className="mb-15px" alt="" />
                    <p className="uppercase fs-10px light-blue text-center graphik-medium lh-2">
                      COLLABORATION
                      <br />
                      TOOLS
                    </p>
                  </div>
                </ToolTip>
              </div>
              <div className="report">
                <ToolTip to="top">
                  <div className="ring-inner-content">
                    <img src={analyticsImg} className="mb-15px" alt="" />
                    <p className="uppercase fs-10px light-blue text-center graphik-medium lh-2">
                      REPORTING
                    </p>
                  </div>
                </ToolTip>
              </div>
              <div className="integration">
                <ToolTip to="top">
                  <div className="ring-inner-content  ">
                    <img src={puzzelImg} className="mb-15px" alt="" />
                    <p className="uppercase fs-10px light-blue text-center graphik-medium lh-2">
                      INTEGRATIONS
                    </p>
                  </div>
                </ToolTip>
              </div>
              <div className="ring-logo">
                <img src={ringLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-content"
        style={{ position: "relative", zIndex: "10" }}
      >
        <div className="resources-wrapper">
          <div className="container-wrapper">
            <div className="resources">
              <p className="text-center fs-36px darkest-blue graphik-medium mb-20px">
                Content and resources
              </p>
              <p className="text-center lh-2 fs-18px light-blue ">
                Learn how to scale your customer support function while
                maintaining high-quality support with <br /> these helpful
                resources written by our team of customer champions
              </p>

              <div className="resources-cards">
                <ResourcesCard
                  img={resourcesImg1}
                  headline="FREE GUIDE"
                  title="Step by Step: How to Choose Your Perfect Help Desk"
                />
                <ResourcesCard
                  img={resourcesImg2}
                  headline="CUSTOMER STORY"
                  title="How Brain.fm Achieved a 95% CSAT Score With Help Scout"
                />
                <ResourcesCard
                  img={resourcesImg3}
                  headline="FREE COURSE"
                  title="Foundations of Great Service: 6-Part Email Series"
                />
                <ResourcesCard
                  img={resourcesImg4}
                  headline="SCALING SUPPORT"
                  title="The Right Way to Scale Customer Support"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="help-scout-wrapper my-150px">
          <div className="container-wrapper">
            <div className="help-scout">
              <p className="fs-30px mb-25px graphik-medium darkest-blue">
                Get started with Help Scout
              </p>
              <p className="mb-30px light-blue lh-2 fs-18px">
                Want to learn what Help Scout can do for you? See for yourself
                with a free trial — we'll happily extend you if you need more
                time.
              </p>
              <button className="button-wrapper fs-18px white bg-sharp-blue radius-4px pointer">
                Try for free
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-wrapper">
        <div className="container-wrapper">
          <div>
            <div className="footer">
              <div className="footer-title-box">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 137.5 166"
                    role="img"
                    className="mb-15px"
                    style={{ width: "25px", height: "30px" }}
                  >
                    <path
                      fill="#1292ee"
                      d="M9.9 97.2l48.6-48.6c6.3-6.2 10.2-14.9 10.2-24.4 0-9.4-3.8-18-9.9-24.2L10.2 48.6C3.9 54.8 0 63.5 0 73c0 9.5 3.8 18 9.9 24.2zM127.6 68.8L79 117.4c-6.3 6.2-10.2 14.9-10.2 24.4 0 9.4 3.8 18 9.9 24.2l48.6-48.6c6.3-6.2 10.2-14.9 10.2-24.4 0-9.5-3.8-18-9.9-24.2zM127.3 48.7s0-.1 0 0c6.3-6.2 10.2-14.9 10.2-24.4 0-9.4-3.8-18-9.9-24.2L10.2 117.4C3.9 123.6 0 132.3 0 141.8c0 9.4 3.8 18 9.9 24.2L127.3 48.7z"
                    ></path>
                  </svg>
                  <p className="white fs-24px footer-title-box-title">
                    Tools for the world's most customer-centric businesses
                  </p>
                </div>
                <div className="footer-title-box-bottom">
                  <a href="">
                    <img src={bCorpImg} alt="" />
                  </a>
                  <a href="">
                    <img src={pledgeImg} alt="" />
                  </a>
                </div>
              </div>

              <div className="footer-lists">
                <div className="footer-box">
                  <List
                    listTitle="Platform"
                    listData={[
                      { title: "Shared Inbox", link: "#" },
                      { title: "Knowledge Base", link: "#" },
                      { title: "Live Chat", link: "#" },
                      { title: "Messaging", link: "#" },
                      { title: "Customer Management", link: "#" },
                      { title: "Reporting", link: "#" },
                      { title: "Integrations", link: "#" },
                      { title: "iOS & Android", link: "#" },
                      { title: "More Features", link: "#" },
                    ]}
                  />
                </div>
                <div className="footer-box">
                  <List
                    listTitle="Compare"
                    listData={[
                      { title: "Help Scout vs. Zendesk", link: "#" },
                      { title: "Help Scout vs. Intercom", link: "#" },
                      { title: "Help Scout vs. Front", link: "#" },
                      { title: "Help Scout vs. Freshdesk", link: "#" },
                    ]}
                  />
                </div>
                <div className="footer-box">
                  <List
                    listTitle="Company"
                    listData={[
                      { title: "About Us", link: "#" },
                      { title: "Careers", link: "#" },
                      { title: "DEI Dashboard", link: "#" },
                      { title: "Help Scout for Good", link: "#" },
                      { title: "Startup Program", link: "#" },
                      { title: "Brand Handbook", link: "#" },
                      { title: "In the Works", link: "#", new: true },
                      { title: "Terms & Privacy", link: "#" },
                      { title: "Accessibility Statement", link: "#" },
                    ]}
                  />
                </div>
                <div className="footer-box">
                  <List
                    listTitle="Get Help"
                    listData={[
                      { title: "Developers", to: "true", link: "#" },
                      { title: "Help Docs", to: "true", link: "#" },
                      { title: "Free Training", link: "#" },
                      { title: "Contact Sales", link: "#" },
                      {
                        title: "Status",
                        to: "true",
                        link: "#",
                        revenu: "true",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="footer-social">
              <div className="footer-social-icons">
                <a
                  aria-label="Twitter"
                  href="https://twitter.com/helpscout"
                  className="footer-social-icon"
                  title="Twitter"
                >
                  <TwitterIcon />
                </a>
                <a
                  aria-label="Facebook"
                  href="https://www.facebook.com/helpscout"
                  className="footer-social-icon"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com/company/help-scout"
                  className="footer-social-icon"
                  title="LinkedIn"
                >
                  <LinkdenIcon />
                </a>
              </div>
              <div className="footer-copyrights">
                <span>
                  <img src={signImg} alt="" />
                  <p className="fs-14px white graphik-medium">
                    Made by hand in over 75 cities around the world.
                  </p>
                </span>
                <p className="fs-14px gray">© 2021 Help Scout</p>
                <div className="footer-title-box-bottom">
                  <a href="">
                    <img src={bCorpImg} alt="" />
                  </a>
                  <a href="">
                    <img src={pledgeImg} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
