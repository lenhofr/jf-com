import jessWorking from "@/assets/jess_working.jpeg";

const BioSection = () => {
  return (
    <section id="bio" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] mb-3">
              Background
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              BIO
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_360px] items-start">
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Jesse Foreman, a lifelong resident of Northern Kentucky, lives in Florence with his newlywed wife Flavia Foreman. He is an alumnus of Holy Cross High School (2005) and Northern Kentucky University (2010), where he obtained multiple degrees. Jesse was the second in his mother's family to graduate high school and the first to go to college. He continued his academic journey and earned a Juris Doctorate from the University of Cincinnati College of Law in 2014.
              </p>
              <p>
                Mr. Foreman attended law school to pursue his dreams of becoming a NFL Agent. Upon earning his Juris Doctorate, he immediately took the NFLPA exam and became a Certified NFL Contract Advisor. In his first year as a NFL Agent he had multiple players drafted. Throughout his career he has represented multiple draft picks, Super Bowl Champions, and Pro Bowlers.
              </p>
              <p>
                Throughout his life he has been an Entrepreneur and a risk taker. He got his first job when he was 15 years old and was a promoter for Coconut Joe's at Jeff Ruby's Waterfront. He started his own promotional company at 17. Jesse has been interviewed and/or quoted by Forbes, Yahoo, Nasdaq, and ESPN. He was also a Forbes Business Council Member and Article Contributor for multiple years.
              </p>
            </div>

            <div>
              <img
                src={jessWorking}
                alt="Jesse working"
                className="w-full max-w-sm md:max-w-none mx-auto rounded-xl shadow-md object-cover"
                loading="lazy"
              />
            </div>

            <p className="md:col-span-2 text-lg text-muted-foreground leading-relaxed">
              After being out of law school for 11 years, Mr. Foreman decided to practice law and became a licensed Attorney in Kentucky in 2025. He has fought and won several cases as a private attorney. He takes pride in his work ethic, his fighting spirit, his determination, and his willingness to take risks. From businesses that have succeeded to businesses that have failed; from running with the bulls in Spain to riding a bull in a rodeo; and from swimming with sharks to competing in martial arts and qualifying for the world level. Jesse Foreman will work for our district, fight for our district, and take the risks needed to secure a better future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
