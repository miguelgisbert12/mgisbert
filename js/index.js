// Página de inicio
// ---------------------------------------------------------------------------

// Cambio de imagen principal al hacer click en las categorías
// Cambio de categoría de proyectos

const btn_webdesign = document.getElementById('web_design_category');
const btn_video = document.getElementById('video_category');
const img1 = document.getElementById('main_image1');
const img2 = document.getElementById('main_image2');
let actualCategory = "web";


btn_video.addEventListener('click', () => {
    if(actualCategory === "web") {
        img1.classList.remove('static_img');
        img1.classList.add('exit_left_img');
        img2.classList.remove('exit_right_img');
        img2.classList.add('static_img');
        btn_webdesign.style.color = "#AEAEAE";
        btn_video.style.color = "#1A1A1A";
        categorySwap("video");
        actualCategory = "video";
    };
});
btn_webdesign.addEventListener('click', () => {
    if(actualCategory === "video") {
        img2.classList.remove('static_img');
        img2.classList.add('exit_right_img');
        img1.classList.remove('exit_left_img');
        img1.classList.add('static_img');
        btn_webdesign.style.color = "#1A1A1A";
        btn_video.style.color = "#AEAEAE";
        categorySwap("web");
        actualCategory = "web";
    };
});


function categorySwap(category) {
    const category_video = document.getElementById('last_projects_video');
    const category_web = document.getElementById('last_projects_web');

    if (category === 'video') {
        category_web.classList.remove('animation_entry');
        category_web.classList.remove('move_down');
        category_web.classList.add('animation_exit');

        if (category_video.classList.contains('off')) {
            category_video.classList.remove('off');
        };

        setTimeout(() => {
            category_web.classList.add('off');
            category_web.classList.remove('animation_exit');
            category_video.classList.add('animation_entry');
            category_web.classList.add('move_down');
        }, 500);

    } else if (category === 'web') {
        category_video.classList.remove('animation_entry');
        category_video.classList.remove('move_down');
        category_video.classList.add('animation_exit');
        
        setTimeout(() => {
            if (category_web.classList.contains('off')) {
                category_web.classList.remove('off');
            };
        }, 450);
        
        setTimeout(() => {
            category_video.classList.add('off');
            category_video.classList.remove('animation_exit');
            category_web.classList.add('animation_entry');
            category_video.classList.add('move_down');
        }, 500);
    };
};