export default function Side(
{ 
    searchTerm, setSearchTerm,
    selectedTypes, setSelectedTypes, 
    selectedGrades, setSelectedGrades, 
    selectedProgress, setSelectedProgress,
    selectedStars, setSelectedStars,
    selectedPercentage,setSelectedPercentage,
    setCurrentPage
}) {
    const businessTypes = ["Scalable", "Small", "Big","Buyable","Life-style","Social"];
    const ratingGrades = ["5 stars", "4 stars and upper", "3 stars and upper","3 stars and below"];
    const  projectProgression= ["Upper 80%", "Upper 50%", "50% and below"];
    const handleCheckboxChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type) 
                : [...prev, type] 
        );
    };

    const handleGradeChange = (grade) => {
        setSelectedGrades((prev) =>
            prev.includes(grade)
                ? prev.filter((g) => g !== grade)
                : [...prev, grade]
        );
    };
    const handleProgressChange = (progress) => {
        setSelectedProgress((prev) =>
            prev.includes(progress)
                ? prev.filter((p) => p !== progress)
                : [...prev, progress]
        );
    };

    const sortedBusinessTypes = [...businessTypes].sort((a, b) => {
        const aChecked = selectedTypes.includes(a);
        const bChecked = selectedTypes.includes(b);
        if (aChecked && !bChecked) return -1;
        if (!aChecked && bChecked) return 1;
        return 0;
    });
    
    const sortedRating = [...ratingGrades].sort((a, b) => {
        const aChecked = selectedGrades.includes(a);
        const bChecked = selectedGrades.includes(b);
        if (aChecked && !bChecked) return -1;
        if (!aChecked && bChecked) return 1;
        return 0;
    });
    
    const sortedProgression = [...projectProgression].sort((a, b) => {
        const aChecked = selectedProgress.includes(a);
        const bChecked = selectedProgress.includes(b);
        if (aChecked && !bChecked) return -1;
        if (!aChecked && bChecked) return 1;
        return 0;
    });
    const handleFilterChange = (updateFilter) => {
        updateFilter();
        setCurrentPage(1);
      };
    return(
         <div>
         <s1 className="inputText1">Search the name of the project:</s1>
             <div className="search-bar">
                <span className="search-icon">🔍</span>
                    <input type="text" className="search-input" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button className="search-btn">Search</button>
            </div>
           <div className="Business">
           <div className="sidehead" id="sidehead">
                <s2>Type of Business: </s2>
            </div>
            <div className="sidebody">
                {sortedBusinessTypes.map((type) => (
                    <div key={type}>
                        <label htmlFor={type}>{type}</label>
                        <input type="checkbox" id={type} name={type} value={type} checked={selectedTypes.includes(type)} onChange={() => handleCheckboxChange(type)}
                        />
                    </div>))}
            </div>
           </div>
           
           <div className="Rating">
           <a1 className="sidehead" id="side head">
                <s2>Business Potential: </s2>
            </a1>
            <div className="sidebody">
                {sortedRating.map((grade) => (
                    <div key={grade}>
                        <label htmlFor={grade}>{grade}</label>
                        <input type="checkbox" id={grade} name={grade} value={grade} checked={selectedGrades.includes(grade)} onChange={() => handleGradeChange(grade)}
                        />
                    </div>))}
                    <input
                        type="range"
                        min="0"
                         max="5"
                        step="0.1"
                        value={selectedStars}
                        onChange={(e) => setSelectedStars(Number(e.target.value))}
                        />
                    <span className="range-val">{selectedStars} Stars</span>
            </div>
           </div>

           <div className="Millstone">
           <a1 className="sidehead" id="side head">
                        <s2>Project progression:</s2>
            </a1>
            <div className="sidebody">
                {sortedProgression.map((progress) => (
                    <div key={progress}>
                        <label htmlFor={progress}>{progress}</label>
                        <input type="checkbox" id={progress} name={progress} value={progress} checked={selectedProgress.includes(progress)} onChange={() => handleProgressChange(progress)}
                        />
                    </div>))}
                    <input
                        id="percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={selectedPercentage}
                        onChange={(e) => setSelectedPercentage(parseInt(e.target.value))}
                    />   
                    <span className="range-val">{selectedPercentage}%</span>
            </div>
           </div>
       </div>
        
    )
}