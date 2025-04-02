

function googleSearch() {
    const searchTerm= document.getElementById("search_input").value; // 검색어로설정
    const googleSearchUrl= `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    // 새창에서구글검색을수행
    window.open(googleSearchUrl, "_blank"); // 새로운창에서열기.
    return false;
    }
    document.getElementById("search_toggle").addEventListener("click", function () {
        let searchForm = document.querySelector(".search-form");
        searchForm.classList.toggle("active");
    
        let input = document.getElementById("search_input");
        if (searchForm.classList.contains("active")) {
            input.focus();
        } else {
            input.value = ""; // 검색어 초기화
        }
    });
    