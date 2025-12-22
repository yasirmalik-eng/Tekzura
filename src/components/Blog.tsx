import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import ArticleOverlay from './ArticleOverlay';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    {
      title: 'The Future of AI in Business Automation',
      excerpt: 'Explore how artificial intelligence is revolutionizing business processes and why automation is no longer optional for competitive enterprises.',
      category: 'AI & Automation',
      date: 'Dec 10, 2024',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      gradient: 'from-cyan-400 to-blue-600',
      tags: ['AI', 'Automation', 'Business'],
      summary: 'Artificial intelligence is reshaping how modern businesses operate. Automation is no longer a competitive advantage — it\'s a necessity. This article explores how AI-driven automation is transforming workflows, reducing operational costs, and enabling organizations to scale with precision.',
      content: {
        sections: [
          {
            title: 'Why Automation is Essential for Modern Enterprises',
            content: 'In today\'s fast-paced business landscape, manual processes create bottlenecks that limit growth and efficiency. Automation powered by AI eliminates repetitive tasks, reduces human error, and frees teams to focus on strategic initiatives. Companies that embrace automation see improved productivity, faster time-to-market, and significant cost savings. The question is no longer whether to automate, but how quickly you can implement intelligent systems that drive measurable results.'
          },
          {
            title: 'How AI Improves Decision-Making and Operational Efficiency',
            content: 'AI-driven automation goes beyond simple task execution — it provides real-time insights, predictive analytics, and data-driven recommendations. By analyzing massive datasets instantly, AI systems enable leaders to make informed decisions faster. Operational efficiency improves as workflows become streamlined, communication becomes automated, and resources are allocated more effectively. The result is a business that operates smarter, adapts faster, and delivers better outcomes.'
          },
          {
            title: 'Real-World Use Cases of AI-Powered Workflows',
            content: 'From customer service chatbots to intelligent inventory management, AI is transforming industries. E-commerce platforms use AI to personalize recommendations and optimize pricing strategies. Marketing teams leverage automation to run targeted campaigns at scale. Financial institutions employ AI for fraud detection and risk assessment. These real-world applications demonstrate how automation is not a future concept — it\'s happening now, delivering tangible value across sectors.'
          },
          {
            title: 'Preparing Your Business for an Automated Future',
            content: 'Transitioning to an automated, AI-powered business model requires strategic planning and the right technology partners. Start by identifying high-impact areas where automation can deliver immediate value. Build a roadmap that aligns automation initiatives with your business goals. Invest in scalable, flexible solutions that evolve with your needs. Most importantly, work with experts who understand both the technology and your industry to ensure successful implementation and long-term success.'
          }
        ]
      },
      cta: {
        text: 'Ready to Transform Your Operations?',
        description: 'Explore how Tekzura can automate your business operations intelligently.'
      }
    },
    {
      title: 'Building Scalable Web Applications in 2024',
      excerpt: 'Learn the best practices and modern frameworks for creating web applications that can handle millions of users without breaking a sweat.',
      category: 'Web Development',
      date: 'Dec 8, 2024',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop',
      gradient: 'from-blue-400 to-purple-600',
      tags: ['Web Dev', 'Scalability', 'Architecture'],
      summary: 'Scalability is the foundation of long-term digital success. This article breaks down modern frameworks, architectural patterns, and development practices that allow applications to scale smoothly — even under heavy traffic.',
      content: {
        sections: [
          {
            title: 'Modern Frontend and Backend Architecture',
            content: 'Building scalable applications begins with choosing the right architecture. Modern web apps leverage microservices, serverless functions, and component-based frontend frameworks like React and Next.js. Backend systems must be decoupled, stateless, and optimized for horizontal scaling. APIs should follow RESTful or GraphQL principles, enabling flexibility and performance. A well-architected system ensures that as traffic grows, your infrastructure can scale seamlessly without major refactoring.'
          },
          {
            title: 'Performance Optimization Strategies',
            content: 'Performance is critical for user retention and SEO. Optimize frontend performance through code splitting, lazy loading, and image compression. Use Content Delivery Networks (CDNs) to reduce latency and improve load times globally. On the backend, implement caching strategies, database indexing, and query optimization. Monitor performance metrics continuously and identify bottlenecks before they impact users. Fast applications lead to better engagement, higher conversions, and improved search rankings.'
          },
          {
            title: 'Handling Large-Scale Traffic Efficiently',
            content: 'When your application experiences high traffic, infrastructure becomes the deciding factor. Use load balancers to distribute requests across multiple servers. Implement auto-scaling to handle traffic spikes dynamically. Leverage cloud platforms like AWS, Google Cloud, or Azure for elastic infrastructure. Design your database layer to handle concurrent reads and writes efficiently. Stress-test your system regularly to ensure it can handle peak loads without degradation.'
          },
          {
            title: 'Building Future-Proof Web Platforms',
            content: 'Future-proof applications are built with adaptability in mind. Use modular, maintainable code that can evolve as requirements change. Adopt CI/CD pipelines for rapid, reliable deployments. Prioritize security from the start — implement authentication, encryption, and regular vulnerability assessments. Document your architecture and processes to ensure knowledge continuity. A future-proof platform grows with your business, supporting new features and scaling effortlessly as demand increases.'
          }
        ]
      },
      cta: {
        text: 'Build Scalable Systems with Tekzura',
        description: 'Partner with Tekzura\'s expert development team to create web platforms built for growth.'
      }
    },
    {
      title: 'Mobile-First Design: Why It Matters More Than Ever',
      excerpt: 'With mobile traffic surpassing desktop, discover why mobile-first design is critical for user engagement and conversion rates.',
      category: 'Design',
      date: 'Dec 5, 2024',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      gradient: 'from-purple-400 to-pink-600',
      tags: ['Design', 'Mobile', 'UX'],
      summary: 'With mobile traffic dominating the digital landscape, mobile-first design is critical for engagement and conversions. This article explains why designing for mobile first leads to better usability and stronger business results.',
      content: {
        sections: [
          {
            title: 'Importance of Mobile-First UX',
            content: 'Mobile devices account for over 60% of web traffic globally, making mobile-first design essential. Users expect fast, intuitive experiences on their phones — anything less leads to high bounce rates. Mobile-first design forces teams to prioritize content, streamline navigation, and optimize performance. By designing for the smallest screen first, you ensure that every element serves a purpose. This approach results in cleaner interfaces, faster load times, and better overall user experiences across all devices.'
          },
          {
            title: 'Design Principles for Smaller Screens',
            content: 'Designing for mobile requires rethinking traditional layouts. Use vertical scrolling instead of horizontal navigation. Prioritize touch-friendly elements with adequate spacing. Simplify forms and minimize input requirements. Optimize images and media for mobile bandwidth. Ensure text is readable without zooming. Use progressive disclosure to show information gradually. Mobile-first design isn\'t about shrinking desktop layouts — it\'s about reimagining the entire experience for how people actually use their phones.'
          },
          {
            title: 'Impact on Conversions and Engagement',
            content: 'Mobile-first design directly impacts business metrics. Faster load times reduce bounce rates and improve SEO rankings. Intuitive mobile experiences increase time on site and pages per session. Simplified checkout processes lead to higher conversion rates. Users are more likely to engage with content that\'s easy to consume on their devices. Companies that prioritize mobile-first design see measurable improvements in user satisfaction, retention, and revenue.'
          },
          {
            title: 'Common Mobile UX Mistakes to Avoid',
            content: 'Many websites fail on mobile due to preventable mistakes. Avoid tiny tap targets that frustrate users. Don\'t use pop-ups that are difficult to close on small screens. Never rely on hover states — mobile devices don\'t have hover. Avoid large, unoptimized images that slow loading. Don\'t force users to pinch and zoom to read content. Test your mobile experience rigorously on real devices. Identifying and fixing these issues ensures your mobile users have a seamless, enjoyable experience.'
          }
        ]
      },
      cta: {
        text: 'Elevate Your Mobile Experience',
        description: 'Upgrade your digital experience with Tekzura\'s mobile-first design strategies.'
      }
    },
    {
      title: 'Maximizing ROI with Data-Driven Marketing',
      excerpt: 'Uncover the strategies top companies use to leverage data analytics for marketing campaigns that deliver measurable results.',
      category: 'Marketing',
      date: 'Dec 3, 2024',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      gradient: 'from-pink-400 to-rose-600',
      tags: ['Marketing', 'Analytics', 'ROI'],
      summary: 'Top-performing brands rely on data, not guesswork. This article reveals how analytics-driven marketing strategies help businesses maximize ROI and make smarter campaign decisions.',
      content: {
        sections: [
          {
            title: 'Using Data to Guide Marketing Decisions',
            content: 'Data-driven marketing eliminates guesswork and replaces it with actionable insights. By analyzing customer behavior, engagement patterns, and conversion metrics, marketers can make informed decisions that drive results. Track which channels deliver the highest ROI. Understand which messages resonate with your audience. Identify drop-off points in the customer journey. Data empowers teams to allocate budgets effectively, optimize campaigns in real-time, and focus resources on strategies that deliver measurable impact.'
          },
          {
            title: 'Campaign Optimization Techniques',
            content: 'Optimization is an ongoing process that maximizes campaign performance. Use A/B testing to compare headlines, visuals, and calls-to-action. Analyze email open rates and click-through rates to refine messaging. Monitor ad performance across platforms and adjust bids dynamically. Segment audiences based on behavior and demographics for personalized targeting. Continuously iterate based on data insights. Successful marketers don\'t launch and forget — they test, learn, and refine to achieve the best possible results.'
          },
          {
            title: 'Measuring Performance Effectively',
            content: 'Measurement is the foundation of data-driven marketing. Define clear KPIs aligned with business goals — whether it\'s lead generation, sales, or brand awareness. Use analytics tools to track user journeys from first touch to conversion. Implement attribution models to understand which channels contribute most to success. Monitor metrics like customer acquisition cost (CAC), lifetime value (LTV), and return on ad spend (ROAS). Effective measurement reveals what\'s working, what\'s not, and where to invest for maximum impact.'
          },
          {
            title: 'Scaling Successful Strategies',
            content: 'Once you identify winning strategies, scale them systematically. Increase budgets on high-performing channels while maintaining efficiency. Expand successful campaigns to new audiences or geographies. Automate repetitive tasks to free up resources for strategic work. Use predictive analytics to anticipate trends and stay ahead of competitors. Scaling isn\'t about doing more of everything — it\'s about doubling down on what works and continuously optimizing for growth.'
          }
        ]
      },
      cta: {
        text: 'Grow Smarter with Data',
        description: 'Drive measurable marketing growth with Tekzura\'s data-driven approach.'
      }
    },
    {
      title: 'Cloud Infrastructure: A Complete Guide',
      excerpt: 'Everything you need to know about choosing and implementing cloud infrastructure for your business applications.',
      category: 'Infrastructure',
      date: 'Nov 30, 2024',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
      gradient: 'from-rose-400 to-cyan-600',
      tags: ['Cloud', 'DevOps', 'Infrastructure'],
      summary: 'Choosing the right cloud infrastructure is crucial for performance, security, and scalability. This guide covers everything businesses need to know to make informed infrastructure decisions.',
      content: {
        sections: [
          {
            title: 'Cloud Infrastructure Fundamentals',
            content: 'Cloud infrastructure provides on-demand computing resources without the need for physical hardware. It includes servers, storage, databases, networking, and software delivered over the internet. The three main cloud models are IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service). Leading providers like AWS, Google Cloud, and Azure offer flexible, pay-as-you-go pricing. Understanding these fundamentals helps businesses choose the right cloud strategy for their needs.'
          },
          {
            title: 'Scalability and Reliability Considerations',
            content: 'Cloud infrastructure excels at scalability — resources can grow or shrink based on demand. Auto-scaling ensures your applications handle traffic spikes without manual intervention. High availability is achieved through redundancy, load balancing, and multi-region deployments. Design for failure by implementing backup systems and disaster recovery plans. Use monitoring tools to detect issues before they impact users. A reliable cloud infrastructure ensures your applications remain available, performant, and resilient under any conditions.'
          },
          {
            title: 'Security and Cost Optimization',
            content: 'Security in the cloud is a shared responsibility between the provider and your team. Implement strong access controls, encrypt data at rest and in transit, and regularly audit permissions. Use firewalls, intrusion detection, and DDoS protection. Cost optimization requires monitoring usage, right-sizing resources, and leveraging reserved instances or spot pricing. Eliminate unused resources and automate cost tracking. Balancing security and cost ensures your cloud infrastructure is both safe and economically efficient.'
          },
          {
            title: 'Best Practices for Deployment',
            content: 'Successful cloud deployments follow proven best practices. Use Infrastructure as Code (IaC) tools like Terraform or CloudFormation for repeatable, version-controlled deployments. Implement CI/CD pipelines for automated testing and deployment. Use containerization with Docker and orchestration with Kubernetes for portability and scalability. Monitor performance metrics and logs continuously. Document your architecture and processes. Following these practices ensures reliable, maintainable, and scalable cloud infrastructure that supports business growth.'
          }
        ]
      },
      cta: {
        text: 'Build a Reliable Cloud Foundation',
        description: 'Partner with Tekzura\'s infrastructure experts to create scalable, secure cloud systems.'
      }
    },
    {
      title: 'The Power of Progressive Web Apps',
      excerpt: 'Discover how PWAs combine the best of web and mobile apps to create lightning-fast, engaging user experiences.',
      category: 'Technology',
      date: 'Nov 28, 2024',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
      gradient: 'from-cyan-400 to-purple-600',
      tags: ['PWA', 'Web', 'Mobile'],
      summary: 'Progressive Web Apps combine the best of web and mobile experiences. This article explains how PWAs deliver speed, engagement, and offline functionality without the complexity of native apps.',
      content: {
        sections: [
          {
            title: 'What Makes PWAs Powerful',
            content: 'Progressive Web Apps are web applications that behave like native apps. They load instantly, work offline, and can be installed on home screens. PWAs use service workers to cache content and enable offline functionality. They support push notifications, background sync, and hardware access. Unlike native apps, PWAs don\'t require app store approval or separate codebases for iOS and Android. This makes them faster to develop, easier to maintain, and more accessible to users.'
          },
          {
            title: 'Benefits for Performance and Engagement',
            content: 'PWAs deliver exceptional performance through aggressive caching and optimized loading strategies. Users experience instant page loads, smooth animations, and responsive interactions. The app-like experience increases engagement — users spend more time and return more frequently. Push notifications re-engage users even when they\'re not actively using the app. The ability to work offline ensures functionality regardless of network conditions. These benefits translate to higher conversion rates, better retention, and improved user satisfaction.'
          },
          {
            title: 'Use Cases and Business Advantages',
            content: 'PWAs are ideal for e-commerce, media, social platforms, and content-heavy websites. Retailers use PWAs to deliver fast shopping experiences that rival native apps. Media companies leverage offline functionality for content consumption. Service businesses use PWAs for customer portals and booking systems. The business advantages are clear: lower development costs, faster time-to-market, broader reach, and easier updates. Companies that adopt PWAs see measurable improvements in engagement, conversions, and customer satisfaction.'
          },
          {
            title: 'When to Choose PWA Over Native Apps',
            content: 'PWAs are the right choice when you need cross-platform reach without the complexity of maintaining multiple native apps. They\'re ideal when fast iteration and easy updates are priorities. Choose PWAs for content-driven experiences, e-commerce, and user engagement. Native apps still excel for performance-intensive applications, deep hardware integration, and platform-specific features. In many cases, PWAs offer 80% of native functionality with 50% of the development cost — making them a smart choice for businesses focused on efficiency and reach.'
          }
        ]
      },
      cta: {
        text: 'Build Next-Generation Web Experiences',
        description: 'Create powerful Progressive Web Apps with Tekzura\'s expert development team.'
      }
    },
  ];

  return (
    <section id="blog" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background with animated noise and light streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#0a0e27]" />
        
        {/* Animated light streaks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
            className={`absolute top-${i * 20}% h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent`}
          />
        ))}

        {/* Soft parallax orbs */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"
        />

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-4 backdrop-blur-sm"
          >
            Insights & Articles
          </motion.span>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
            Thought Leadership on AI, Automation & Digital Growth
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in digital technology
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h3 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Stay Ahead with Expert Insights
            </h3>
            <p className="text-gray-400 text-lg">
              Explore the latest trends, strategies, and technologies shaping the future of digital business.
            </p>
          </motion.div>

          <motion.button
            onClick={() => {
              // Scroll to top of blog section
              const blogSection = document.getElementById('blog');
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all group relative overflow-hidden"
          >
            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-xl opacity-50"
            />
            
            <span className="relative z-10 text-lg">View All Articles</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Article Overlay */}
      <ArticleOverlay
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};

const ArticleCard = ({
  article,
  index,
  isInView,
  onClick,
}: {
  article: any;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {/* Glassmorphism card */}
      <div className="relative h-full bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:bg-white/10">
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`} />

        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          <motion.img
            src={article.image}
            alt={article.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 bg-gradient-to-r ${article.gradient} rounded-full text-white text-xs shadow-lg`}
            >
              {article.category}
            </motion.div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl mb-3 text-gray-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag: string, i: number) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-white/5 border border-cyan-500/20 rounded text-cyan-400 text-xs group-hover:border-cyan-400/50 transition-colors"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </motion.span>
            ))}
          </div>

          {/* Read more */}
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center space-x-2 text-cyan-400"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover border animation */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.article>
  );
};

export default Blog;
