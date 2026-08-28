

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-nav]');

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');


/**
 * Exibe uma página e esconde as demais.
 */
function showPage(id, updateHash = true) {

  // Alterna páginas
  pages.forEach(page => {
    page.classList.toggle(
      'active',
      page.id === `page-${id}`
    );
  });


  // Atualiza estado dos links
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.dataset.nav === id
    );
  });


  // Atualiza URL
  if (updateHash) {
    history.replaceState(
      null,
      '',
      `#${id}`
    );
  }


  // Volta para o topo
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });


  // Fecha menu mobile
  closeMobileMenu();


  // Reinicia animações
  initReveal();
}


/* =========================================================
   NAVIGATION EVENTS
========================================================= */

navLinks.forEach(link => {

  link.addEventListener('click', event => {

    event.preventDefault();

    showPage(
      link.dataset.nav
    );

  });

});


/* =========================================================
   MOBILE MENU
========================================================= */

function openMobileMenu() {

  mobileNav.classList.add('open');

  menuToggle.classList.add('open');

  menuToggle.setAttribute(
    'aria-expanded',
    'true'
  );
}


function closeMobileMenu() {

  mobileNav.classList.remove('open');

  menuToggle.classList.remove('open');

  menuToggle.setAttribute(
    'aria-expanded',
    'false'
  );
}


function toggleMobileMenu() {

  const isOpen =
    mobileNav.classList.contains('open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}


menuToggle.addEventListener(
  'click',
  toggleMobileMenu
);


/* =========================================================
   INITIAL PAGE
========================================================= */

const validPages = [
  'home',
  'servicos',
  'projetos',
  'sobre',
  'carreiras',
  'contato'
];


const initialPage =
  location.hash.replace('#', '');


showPage(
  validPages.includes(initialPage)
    ? initialPage
    : 'home',
  false
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initReveal() {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'in-view'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  document
    .querySelectorAll(
      '.page.active .reveal:not(.in-view)'
    )
    .forEach(element => {

      observer.observe(element);

    });
}


initReveal();


/* =========================================================
   CONTACT FORM
========================================================= */

const form =
  document.getElementById(
    'contact-form'
  );

const successMsg =
  document.getElementById(
    'success-msg'
  );

const errorMsg =
  document.getElementById(
    'error-msg'
  );

const submitBtn =
  document.getElementById(
    'submit-btn'
  );


if (form) {

  form.addEventListener(
    'submit',
    async event => {

      event.preventDefault();


      // Reset mensagens
      successMsg.classList.remove(
        'show'
      );

      errorMsg.classList.remove(
        'show'
      );


      // Desabilita botão
      submitBtn.disabled = true;

      submitBtn.textContent =
        'Enviando...';


      try {

        const response =
          await fetch(
            form.action,
            {
              method: 'POST',

              body:
                new FormData(form),

              headers: {
                Accept:
                  'application/json'
              }
            }
          );


        if (response.ok) {

          successMsg.classList.add(
            'show'
          );

          form.reset();

        } else {

          errorMsg.classList.add(
            'show'
          );

        }


      } catch (error) {

        errorMsg.classList.add(
          'show'
        );


      } finally {

        submitBtn.disabled = false;

        submitBtn.textContent =
          'Enviar solicitação';

      }

    }
  );

}

