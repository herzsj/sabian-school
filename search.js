// Dynamic Multi-Page Content Scraper & Search Engine - Sabian Secondary School
document.addEventListener('DOMContentLoaded', function() {

  // 1. Map out your 5 pages with descriptive titles
  var sitePages = [
    { name: "Home Page & News Updates", url: "index.html" },
    { name: "School Background & History", url: "backg.html" },
    { name: "Vision & Mission Statement", url: "vimi.html" },
    { name: "Digital Curriculum Library", url: "dili.html" },
    { name: "Official Links & Portals", url: "lin.html" }
  ];

  // 2. Comprehensive local keyword dictionary to match text variations effortlessly
  var internalTextIndex = [
    // News Feed Matches
    { match: "ፈተና", title: "News: የ12ኛ ክፍል ሀገር አቀፍ መልቀቂያ ፈተና", url: "index.html", desc: "የ2018 ዓ.ም ብሔራዊ ፈተና ማዕከላት መረጃ።" },
    { match: "ኦንላይን", title: "News: በይነ መረብ (ኦንላይን) ፈተና ዝግጅት", url: "index.html", desc: "ድሬዳዋ አስተዳድር ኦንላይን ማጠቃለያ ፈተና መግለጫ።" },
    { match: "ውድድር", title: "News: የጥያቄና መልስ ውድድር ማጠቃለያ", url: "index.html", desc: "\"ተወዳዳሪ ትውልድ!\" የአሸናፊዎች ሽልማት።" },
    { match: "ፈጠራ", title: "News: የሳይንስና ቴክኖሎጂ ፈጠራ አውደ ርዕይ", url: "index.html", desc: "12ኛው የተማሪዎችና መምህራን የፈጠራ ስራ ኤግዚቢሽን።" },
    
    // Grade 9 & 10 Matches
    { match: "grade 9", title: "Grade 9 Curriculum Resources", url: "dili.html", desc: "Grade 9 Mathematics, Physics, Chemistry, and Biology reference books." },
    { match: "grade 10", title: "Grade 10 Curriculum Resources", url: "dili.html", desc: "Grade 10 Textbook libraries, geometry, and basic sciences." },
    
    // Grade 11 & 12 Subject Matches
    { match: "grade 11", title: "Grade 11 Curriculum Resources", url: "dili.html", desc: "Natural Science and Social Science stream preparatory materials." },
    { match: "grade 12", title: "Grade 12 Curriculum Resources", url: "dili.html", desc: "University entrance exam prep, calculus, and advanced books." },
    { match: "biology", title: "Biology Textbooks (Grades 9-12)", url: "dili.html", desc: "Cell biology, genetics, and natural science modules." },
    { match: "physics", title: "Physics Textbooks (Grades 9-12)", url: "dili.html", desc: "Mechanics, fluid dynamics, vortex physics, and thermodynamics." },
    { match: "math", title: "Mathematics Textbooks (Grades 9-12)", url: "dili.html", desc: "Algebra, geometry, matrices, and calculus guides." },
    { match: "chemistry", title: "Chemistry Textbooks (Grades 9-12)", url: "dili.html", desc: "Atomic structures, chemical equations, and lab references." },
    { match: "history", title: "History & Geography Textbooks", url: "dili.html", desc: "Social science streams, historical events, and mapping assets." }
  ];

  var searchForm = document.querySelector('.nav-search-form');
  var searchInput = document.querySelector('.nav-search-input');
  var searchContainer = document.querySelector('.nav-search-container');

  if (!searchForm || !searchInput || !searchContainer) return;

  // Build the dropdown interface overlay element
  var resultsDropdown = document.createElement('div');
  resultsDropdown.className = 'live-search-results';
  searchContainer.appendChild(resultsDropdown);

  function highlightText(sourceText, query) {
    if (!query) return sourceText;
    var index = sourceText.toLowerCase().indexOf(query);
    if (index === -1) return sourceText;
    var originalMatch = sourceText.substr(index, query.length);
    return sourceText.substr(0, index) + "<span class='search-highlight'>" + originalMatch + "</span>" + sourceText.substr(index + query.length);
  }

  // Monitor typing events on the search bar
  searchInput.onkeyup = function() {
    var query = searchInput.value.toLowerCase().trim();
    resultsDropdown.innerHTML = ''; 

    if (query.length < 1) {
      resultsDropdown.style.display = 'none';
      return;
    }

    var matches = [];

    // Scan dictionary rows first for specific feeds or grades
    for (var i = 0; i < internalTextIndex.length; i++) {
      var entry = internalTextIndex[i];
      if (entry.match.indexOf(query) !== -1 || entry.title.toLowerCase().indexOf(query) !== -1) {
        matches.push(entry);
      }
    }

    // Fallback: If no deep keywords match, scan main page names
    if (matches.length === 0) {
      for (var j = 0; j < sitePages.length; j++) {
        var page = sitePages[j];
        if (page.name.toLowerCase().indexOf(query) !== -1) {
          matches.push({ title: page.name, url: page.url, desc: "Go directly to the page contents." });
        }
      }
    }

    // Output findings to user window viewport
    if (matches.length > 0) {
      resultsDropdown.style.display = 'block';
      var maxDisplay = matches.length > 5 ? 5 : matches.length;
      
      for (var k = 0; k < maxDisplay; k++) {
        var item = matches[k];
        var hTitle = highlightText(item.title, query);
        var hDesc = highlightText(item.desc, query);

        var resultLink = document.createElement('a');
        resultLink.href = item.url;
        resultLink.className = 'search-result-item';
        resultLink.innerHTML = '<strong>' + hTitle + '</strong><span class="search-result-desc">' + hDesc + '</span>';
        resultsDropdown.appendChild(resultLink);
      }
    } else {
      resultsDropdown.style.display = 'block';
      resultsDropdown.innerHTML = '<div class="search-no-result">አግባብነት ያለው መረጃ አልተገኘም (No matching text records found)</div>';
    }
  };

  searchForm.onsubmit = function(event) {
    if (event && event.preventDefault) { event.preventDefault(); } else { window.event.returnValue = false; }
    var firstResult = resultsDropdown.querySelector('a');
    if (firstResult) { window.location.href = firstResult.href; }
  };

  document.addEventListener('click', function(event) {
    var target = event.target || event.srcElement;
    if (target !== searchInput && target !== resultsDropdown && !resultsDropdown.contains(target)) {
      resultsDropdown.style.display = 'none';
    }
  });
});
