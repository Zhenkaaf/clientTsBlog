import TypingText from "../components/TypingText";

const HomePage = () => {
    return (
        <div>
            ntrcn
            <TypingText
                texts={[
                    "What makes your car special? Share your story!",
                    "Share your ownership experience: pros, cons, and unexpected discoveries!",
                    "Tell us why this car became your choice!",
                    "It's a great day to write a post about your car!",
                ]}
                speed={50}
                pause={3000}
            />
        </div>
    );
};

export default HomePage;
