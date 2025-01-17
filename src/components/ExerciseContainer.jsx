
export const ExerciseContainer = ({ exerciseNumber, children }) => {
    return (
        <div data-aos="fade-up" data-aos-delay="300" className="bg-white w-full p-3 rounded-xl"
             id={"exercise-" + exerciseNumber}>
            <h1 className="text-md font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ejercicio {exerciseNumber}</h1>
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}