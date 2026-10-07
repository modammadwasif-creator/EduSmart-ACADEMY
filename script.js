 /* =========================================================
   EDUSMART - SINGLE JAVASCRIPT FILE
   Public Website + Admin Panel
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PUBLIC WEBSITE
    ===================================================== */

    const menuBtn = document.getElementById("schoolMenuBtn");
    const mainNav = document.getElementById("schoolMainNav");
    const mobileOverlay = document.getElementById("schoolMobileOverlay");

    function closeMobileMenu() {
        if (mainNav) mainNav.classList.remove("open");
        if (mobileOverlay) mobileOverlay.classList.remove("active");

        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            if (mobileOverlay) {
                mobileOverlay.classList.toggle("active");
            }

            const isOpen = mainNav.classList.contains("open");

            menuBtn.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeMobileMenu);
    }

    if (mainNav) {

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("schoolHeader");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks = document.querySelectorAll(
        ".school-main-nav a[href^='#']"
    );

    const sections = document.querySelectorAll(
        "section[id]"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });
 

    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const loginScreen =
        document.getElementById("loginScreen");

    const dashboard =
        document.getElementById("dashboard");

    const loginError =
        document.getElementById("loginError");

    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");


    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "EduSmart@123";


    function showAdminDashboard() {

        if (loginScreen) {
            loginScreen.style.display = "none";
        }

        if (dashboard) {
            dashboard.style.display = "flex";
        }

    }


    function showAdminLogin() {

        if (dashboard) {
            dashboard.style.display = "none";
        }

        if (loginScreen) {
            loginScreen.style.display = "flex";
        }

    }


    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();

            const username =
                usernameInput?.value.trim();

            const password =
                passwordInput?.value;

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                localStorage.setItem(
                    "edusmartAdminLoggedIn",
                    "true"
                );

                if (loginError) {
                    loginError.textContent = "";
                }

                showAdminDashboard();

            } else {

                if (loginError) {
                    loginError.textContent =
                        "Invalid username or password.";
                }

                if (passwordInput) {
                    passwordInput.value = "";
                }

            }

        });

    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }


    /* =====================================================
       ADMIN AUTO LOGIN
    ===================================================== */

    if (
        loginScreen &&
        dashboard &&
        localStorage.getItem("edusmartAdminLoggedIn") === "true"
    ) {
        showAdminDashboard();
    }


    /* =====================================================
       ADMIN LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem(
                "edusmartAdminLoggedIn"
            );

            showAdminLogin();

        });

    }


    /* =====================================================
       ADMIN SIDEBAR
    ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    const adminNavItems =
        document.querySelectorAll(
            "[data-admin-section]"
        );


    const adminSections =
        document.querySelectorAll(
            ".admin-section"
        );


    function openAdminSection(sectionId) {

        adminSections.forEach(section => {
            section.style.display = "none";
        });

        const target =
            document.getElementById(sectionId);

        if (target) {
            target.style.display = "block";
        }

        adminNavItems.forEach(item => {

            item.classList.remove("active");

            if (
                item.getAttribute("data-admin-section") ===
                sectionId
            ) {
                item.classList.add("active");
            }

        });

        if (sidebar) {
            sidebar.classList.remove("open");
        }

    }


    adminNavItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const sectionId =
                item.getAttribute("data-admin-section");

            if (sectionId) {
                openAdminSection(sectionId);
            }

        });

    });


    /* =====================================================
       STUDENT DATABASE
    ===================================================== */

    const STUDENT_KEY = "edusmartStudents";

    function getStudents() {

        return JSON.parse(
            localStorage.getItem(STUDENT_KEY) || "[]"
        );

    }


    function saveStudents(students) {

        localStorage.setItem(
            STUDENT_KEY,
            JSON.stringify(students)
        );

    }


    function generateStudentId() {

        const students = getStudents();

        let number = 1001;

        const ids = students.map(student =>
            Number(
                String(student.id).replace("EDU-", "")
            )
        );

        while (ids.includes(number)) {
            number++;
        }

        return `EDU-${number}`;

    }


    /* =====================================================
       STUDENT ELEMENTS
    ===================================================== */

    const studentsTableBody =
        document.getElementById("studentsTableBody");

    const emptyStudents =
        document.getElementById("emptyStudents");

    const addStudentBtn =
        document.getElementById("addStudentBtn");

    const studentModal =
        document.getElementById("studentModal");

    const closeStudentModal =
        document.getElementById("closeStudentModal");

    const cancelStudentBtn =
        document.getElementById("cancelStudentBtn");

    const studentForm =
        document.getElementById("studentForm");


    /* =====================================================
       STUDENT MODAL
    ===================================================== */

    function openStudentModal(student = null) {

        if (!studentModal) return;

        studentModal.classList.add("active");

        const title =
            document.getElementById("studentModalTitle");

        const editId =
            document.getElementById("editStudentId");

        const name =
            document.getElementById("studentName");

        const father =
            document.getElementById("fatherName");

        const className =
            document.getElementById("studentClass");

        const phone =
            document.getElementById("studentPhone");

        const gender =
            document.getElementById("studentGender");

        const status =
            document.getElementById("studentStatus");


        if (student) {

            if (title) title.textContent = "Edit Student";

            if (editId) editId.value = student.id;

            if (name) name.value = student.name || "";

            if (father) father.value =
                student.fatherName || "";

            if (className) className.value =
                student.className || "";

            if (phone) phone.value =
                student.phone || "";

            if (gender) gender.value =
                student.gender || "";

            if (status) status.value =
                student.status || "Active";

        } else {

            if (title) title.textContent = "Add Student";

            if (studentForm) studentForm.reset();

            if (editId) editId.value = "";

        }

    }


    function closeStudentModalBox() {

        if (studentModal) {
            studentModal.classList.remove("active");
        }

    }


    if (addStudentBtn) {

        addStudentBtn.addEventListener("click", () => {
            openStudentModal();
        });

    }


    if (closeStudentModal) {
        closeStudentModal.addEventListener(
            "click",
            closeStudentModalBox
        );
    }


    if (cancelStudentBtn) {
        cancelStudentBtn.addEventListener(
            "click",
            closeStudentModalBox
        );
    }


    /* =====================================================
       SAVE STUDENT
    ===================================================== */

    if (studentForm) {

        studentForm.addEventListener("submit", event => {

            event.preventDefault();

            const students = getStudents();

            const editId =
                document.getElementById("editStudentId")?.value;

            const student = {

                id:
                    editId ||
                    generateStudentId(),

                name:
                    document.getElementById("studentName")?.value.trim(),

                fatherName:
                    document.getElementById("fatherName")?.value.trim(),

                className:
                    document.getElementById("studentClass")?.value,

                phone:
                    document.getElementById("studentPhone")?.value.trim(),

                gender:
                    document.getElementById("studentGender")?.value,

                status:
                    document.getElementById("studentStatus")?.value ||
                    "Active"

            };


            if (
                !student.name ||
                !student.fatherName ||
                !student.className ||
                !student.phone
            ) {

                alert("Please fill in all required fields.");

                return;

            }


            if (editId) {

                const index =
                    students.findIndex(
                        item => item.id === editId
                    );

                if (index !== -1) {
                    students[index] = student;
                }

            } else {

                students.push(student);

            }


            saveStudents(students);

            closeStudentModalBox();

            renderStudents();

            updateAdminStats();

        });

    }


    /* =====================================================
       RENDER STUDENTS
    ===================================================== */

    function renderStudents() {

        if (!studentsTableBody) return;

        const students = getStudents();

        const searchInput =
            document.getElementById("studentSearch");

        const classFilter =
            document.getElementById("classFilter");


        const search =
            searchInput?.value.toLowerCase().trim() || "";

        const selectedClass =
            classFilter?.value || "";


        const filtered =
            students.filter(student => {

                const matchesSearch =
                    !search ||
                    student.name.toLowerCase().includes(search) ||
                    student.id.toLowerCase().includes(search) ||
                    student.fatherName.toLowerCase().includes(search);

                const matchesClass =
                    !selectedClass ||
                    student.className === selectedClass;

                return matchesSearch && matchesClass;

            });


        studentsTableBody.innerHTML = "";


        if (filtered.length === 0) {

            if (emptyStudents) {
                emptyStudents.style.display = "block";
            }

            return;

        }


        if (emptyStudents) {
            emptyStudents.style.display = "none";
        }


        filtered.forEach(student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>${escapeHTML(student.id)}</strong>
                </td>

                <td>
                    ${escapeHTML(student.name)}
                </td>

                <td>
                    ${escapeHTML(student.fatherName)}
                </td>

                <td>
                    ${escapeHTML(student.className)}
                </td>

                <td>
                    ${escapeHTML(student.phone)}
                </td>

                <td>
                    <span class="student-status ${student.status === "Active" ? "active" : "inactive"}">
                        ${escapeHTML(student.status)}
                    </span>
                </td>

                <td>

                    <button
                        type="button"
                        class="student-action edit"
                        data-id="${escapeHTML(student.id)}"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        class="student-action delete"
                        data-id="${escapeHTML(student.id)}"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </td>

            `;


            studentsTableBody.appendChild(row);

        });


        addStudentRowEvents();

    }


    /* =====================================================
       STUDENT ACTIONS
    ===================================================== */

    function addStudentRowEvents() {

        document.querySelectorAll(
            ".student-action.edit"
        ).forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    button.dataset.id;

                const student =
                    getStudents().find(
                        item => item.id === id
                    );

                if (student) {
                    openStudentModal(student);
                }

            });

        });


        document.querySelectorAll(
            ".student-action.delete"
        ).forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    button.dataset.id;

                const student =
                    getStudents().find(
                        item => item.id === id
                    );

                if (!student) return;


                const confirmed =
                    confirm(
                        `Delete ${student.name}?`
                    );


                if (!confirmed) return;


                const students =
                    getStudents().filter(
                        item => item.id !== id
                    );


                saveStudents(students);

                renderStudents();

                updateAdminStats();

            });

        });

    }


    /* =====================================================
       SEARCH + FILTER
    ===================================================== */

    const studentSearch =
        document.getElementById("studentSearch");

    const classFilter =
        document.getElementById("classFilter");


    if (studentSearch) {
        studentSearch.addEventListener(
            "input",
            renderStudents
        );
    }


    if (classFilter) {
        classFilter.addEventListener(
            "change",
            renderStudents
        );
    }


    /* =====================================================
       ADMIN STATISTICS
    ===================================================== */

    function updateAdminStats() {

        const students = getStudents();

        const totalStudents =
            document.getElementById("totalStudents");

        const activeStudents =
            document.getElementById("activeStudents");

        const totalClasses =
            document.getElementById("totalClasses");


        if (totalStudents) {
            totalStudents.textContent =
                students.length;
        }


        if (activeStudents) {

            activeStudents.textContent =
                students.filter(
                    student => student.status === "Active"
                ).length;

        }


        if (totalClasses) {

            const classes =
                new Set(
                    students.map(
                        student => student.className
                    )
                );

            totalClasses.textContent =
                classes.size;

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value ?? "";

        return div.innerHTML;

    }


    /* =====================================================
       INITIAL ADMIN DATA
    ===================================================== */

    if (studentsTableBody) {

        renderStudents();

        updateAdminStats();

    }


    /* =====================================================
       ADMIN HASH ROUTING
    ===================================================== */

    function loadAdminHash() {

        if (!window.location.hash) return;

        const section =
            window.location.hash.replace("#", "");

        if (!section) return;

        if (
            document.getElementById(section) &&
            document
                .getElementById(section)
                .classList.contains("admin-section")
        ) {

            openAdminSection(section);

        }

    }


    loadAdminHash();


    /* =====================================================
       UPDATE URL HASH
    ===================================================== */

    adminNavItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.getAttribute("data-admin-section");

            if (section) {
                history.replaceState(
                    null,
                    "",
                    "#" + section
                );
            }

        });

    });


    /* =====================================================
       CLOSE MODAL WITH OUTSIDE CLICK
    ===================================================== */

    if (studentModal) {

        studentModal.addEventListener("click", event => {

            if (event.target === studentModal) {
                closeStudentModalBox();
            }

        });

    }
    


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeStudentModalBox();
            closeMobileMenu();

        }

    });

});


/* =========================================================
   EDUSMART - ADMISSION PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       RUN ONLY ON ADMISSION PAGE
    ----------------------------------------------------- */

    const admissionForm = document.getElementById("admissionFormElement");

    if (!admissionForm) {
        return;
    }


    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const successModal =
        document.getElementById("admissionSuccessModal");

    const generatedAdmissionNumber =
        document.getElementById("generatedAdmissionNumber");

    const closeAdmissionSuccess =
        document.getElementById("closeAdmissionSuccess");

    const successDoneButton =
        document.getElementById("successDoneButton");


    /* -----------------------------------------------------
       LOCAL STORAGE KEY
    ----------------------------------------------------- */

    const ADMISSION_KEY = "edusmartAdmissions";


    /* -----------------------------------------------------
       GET SAVED ADMISSIONS
    ----------------------------------------------------- */

    function getAdmissions() {

        try {

            const saved =
                localStorage.getItem(ADMISSION_KEY);

            return saved ? JSON.parse(saved) : [];

        } catch (error) {

            console.error(
                "Unable to read admission data:",
                error
            );

            return [];
        }
    }


    /* -----------------------------------------------------
       SAVE ADMISSIONS
    ----------------------------------------------------- */

    function saveAdmissions(admissions) {

        localStorage.setItem(
            ADMISSION_KEY,
            JSON.stringify(admissions)
        );
    }


    /* -----------------------------------------------------
       GENERATE APPLICATION NUMBER
    ----------------------------------------------------- */

    function generateAdmissionNumber() {

        const admissions = getAdmissions();

        let number = admissions.length + 1;

        let admissionNumber =
            "EDU-ADM-" +
            String(number).padStart(6, "0");

        /*
         * Make sure the number is unique.
         */

        while (
            admissions.some(
                admission =>
                    admission.applicationNumber ===
                    admissionNumber
            )
        ) {

            number++;

            admissionNumber =
                "EDU-ADM-" +
                String(number).padStart(6, "0");
        }

        return admissionNumber;
    }


    /* -----------------------------------------------------
       GET FORM VALUE
    ----------------------------------------------------- */

    function getValue(id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    }


    /* -----------------------------------------------------
       FORM SUBMIT
    ----------------------------------------------------- */

    admissionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               GET VALUES
            --------------------------------------------- */

            const studentName =
                getValue("admissionStudentName");

            const fatherName =
                getValue("admissionFatherName");

            const dob =
                getValue("admissionDob");

            const gender =
                getValue("admissionGender");

            const studentClass =
                getValue("admissionClass");

            const previousSchool =
                getValue("admissionPreviousSchool");

            const phone =
                getValue("admissionPhone");

            const email =
                getValue("admissionEmail");

            const address =
                getValue("admissionAddress");

            const guardian =
                getValue("admissionGuardian");

            const guardianPhone =
                getValue("admissionGuardianPhone");

            const message =
                getValue("admissionMessage");


            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (
                !studentName ||
                !fatherName ||
                !dob ||
                !gender ||
                !studentClass ||
                !phone ||
                !address
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            /* ---------------------------------------------
               PHONE VALIDATION
            --------------------------------------------- */

            const phonePattern =
                /^[0-9+\-\s]{10,15}$/;

            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid phone number."
                );

                document
                    .getElementById("admissionPhone")
                    .focus();

                return;
            }


            /* ---------------------------------------------
               GENERATE APPLICATION NUMBER
            --------------------------------------------- */

            const applicationNumber =
                generateAdmissionNumber();


            /* ---------------------------------------------
               CREATE ADMISSION OBJECT
            --------------------------------------------- */

            const admissionData = {

                applicationNumber:

                    applicationNumber,

                studentName:

                    studentName,

                fatherName:

                    fatherName,

                dob:

                    dob,

                gender:

                    gender,

                class:

                    studentClass,

                previousSchool:

                    previousSchool,

                phone:

                    phone,

                email:

                    email,

                address:

                    address,

                guardian:

                    guardian,

                guardianPhone:

                    guardianPhone,

                message:

                    message,

                status:

                    "Pending",

                submittedAt:

                    new Date().toISOString()

            };


            /* ---------------------------------------------
               GET OLD ADMISSIONS
            --------------------------------------------- */

            const admissions =
                getAdmissions();


            /* ---------------------------------------------
               ADD NEW ADMISSION
            --------------------------------------------- */

            admissions.push(admissionData);


            /* ---------------------------------------------
               SAVE
            --------------------------------------------- */

            saveAdmissions(admissions);


            /* ---------------------------------------------
               SHOW APPLICATION NUMBER
            --------------------------------------------- */

            if (generatedAdmissionNumber) {

                generatedAdmissionNumber.textContent =
                    applicationNumber;
            }


            /* ---------------------------------------------
               SHOW SUCCESS MODAL
            --------------------------------------------- */

            if (successModal) {

                successModal.classList.add("show");

                document.body.style.overflow = "hidden";
            }


            /* ---------------------------------------------
               RESET FORM
            --------------------------------------------- */

            admissionForm.reset();


            /* ---------------------------------------------
               OPTIONAL EVENT
            --------------------------------------------- */

            window.dispatchEvent(
                new CustomEvent(
                    "edusmartAdmissionSubmitted",
                    {
                        detail: admissionData
                    }
                )
            );


            console.log(
                "EduSmart admission submitted:",
                admissionData
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE SUCCESS MODAL
    ----------------------------------------------------- */

    function closeSuccessModal() {

        if (successModal) {

            successModal.classList.remove("show");

            document.body.style.overflow = "";
        }
    }


    if (closeAdmissionSuccess) {

        closeAdmissionSuccess.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (successDoneButton) {

        successDoneButton.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    /* -----------------------------------------------------
       CLOSE WHEN CLICKING OVERLAY
    ----------------------------------------------------- */

    if (successModal) {

        successModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "admission-success-overlay"
                    )
                ) {

                    closeSuccessModal();
                }

            }
        );
    }


    /* -----------------------------------------------------
       ESC KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                successModal &&
                successModal.classList.contains("show")
            ) {

                closeSuccessModal();
            }

        }
    );


    /* -----------------------------------------------------
       MOBILE MENU
    ----------------------------------------------------- */

    const menuButton =
        document.getElementById("schoolMenuButton");

    const navigation =
        document.querySelector(
            ".admission-page .school-nav"
        );


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "mobile-open"
                    );

                if (isOpen) {

                    navigation.style.display = "flex";

                } else {

                    navigation.style.display = "";
                }

            }
        );
    }


    /* -----------------------------------------------------
       PREVENT INVALID FUTURE DOB
    ----------------------------------------------------- */

    const dobInput =
        document.getElementById("admissionDob");

    if (dobInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dobInput.max = today;
    }

});
/* =========================================================
   EDUSMART - ADMISSION PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       RUN ONLY ON ADMISSION PAGE
    ----------------------------------------------------- */

    const admissionForm = document.getElementById("admissionFormElement");

    if (!admissionForm) {
        return;
    }


    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const successModal =
        document.getElementById("admissionSuccessModal");

    const generatedAdmissionNumber =
        document.getElementById("generatedAdmissionNumber");

    const closeAdmissionSuccess =
        document.getElementById("closeAdmissionSuccess");

    const successDoneButton =
        document.getElementById("successDoneButton");


    /* -----------------------------------------------------
       LOCAL STORAGE KEY
    ----------------------------------------------------- */

    const ADMISSION_KEY = "edusmartAdmissions";


    /* -----------------------------------------------------
       GET SAVED ADMISSIONS
    ----------------------------------------------------- */

    function getAdmissions() {

        try {

            const saved =
                localStorage.getItem(ADMISSION_KEY);

            return saved ? JSON.parse(saved) : [];

        } catch (error) {

            console.error(
                "Unable to read admission data:",
                error
            );

            return [];
        }
    }


    /* -----------------------------------------------------
       SAVE ADMISSIONS
    ----------------------------------------------------- */

    function saveAdmissions(admissions) {

        localStorage.setItem(
            ADMISSION_KEY,
            JSON.stringify(admissions)
        );
    }


    /* -----------------------------------------------------
       GENERATE APPLICATION NUMBER
    ----------------------------------------------------- */

    function generateAdmissionNumber() {

        const admissions = getAdmissions();

        let number = admissions.length + 1;

        let admissionNumber =
            "EDU-ADM-" +
            String(number).padStart(6, "0");

        /*
         * Make sure the number is unique.
         */

        while (
            admissions.some(
                admission =>
                    admission.applicationNumber ===
                    admissionNumber
            )
        ) {

            number++;

            admissionNumber =
                "EDU-ADM-" +
                String(number).padStart(6, "0");
        }

        return admissionNumber;
    }


    /* -----------------------------------------------------
       GET FORM VALUE
    ----------------------------------------------------- */

    function getValue(id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    }


    /* -----------------------------------------------------
       FORM SUBMIT
    ----------------------------------------------------- */

    admissionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               GET VALUES
            --------------------------------------------- */

            const studentName =
                getValue("admissionStudentName");

            const fatherName =
                getValue("admissionFatherName");

            const dob =
                getValue("admissionDob");

            const gender =
                getValue("admissionGender");

            const studentClass =
                getValue("admissionClass");

            const previousSchool =
                getValue("admissionPreviousSchool");

            const phone =
                getValue("admissionPhone");

            const email =
                getValue("admissionEmail");

            const address =
                getValue("admissionAddress");

            const guardian =
                getValue("admissionGuardian");

            const guardianPhone =
                getValue("admissionGuardianPhone");

            const message =
                getValue("admissionMessage");


            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (
                !studentName ||
                !fatherName ||
                !dob ||
                !gender ||
                !studentClass ||
                !phone ||
                !address
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            /* ---------------------------------------------
               PHONE VALIDATION
            --------------------------------------------- */

            const phonePattern =
                /^[0-9+\-\s]{10,15}$/;

            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid phone number."
                );

                document
                    .getElementById("admissionPhone")
                    .focus();

                return;
            }


            /* ---------------------------------------------
               GENERATE APPLICATION NUMBER
            --------------------------------------------- */

            const applicationNumber =
                generateAdmissionNumber();


            /* ---------------------------------------------
               CREATE ADMISSION OBJECT
            --------------------------------------------- */

            const admissionData = {

                applicationNumber:

                    applicationNumber,

                studentName:

                    studentName,

                fatherName:

                    fatherName,

                dob:

                    dob,

                gender:

                    gender,

                class:

                    studentClass,

                previousSchool:

                    previousSchool,

                phone:

                    phone,

                email:

                    email,

                address:

                    address,

                guardian:

                    guardian,

                guardianPhone:

                    guardianPhone,

                message:

                    message,

                status:

                    "Pending",

                submittedAt:

                    new Date().toISOString()

            };


            /* ---------------------------------------------
               GET OLD ADMISSIONS
            --------------------------------------------- */

            const admissions =
                getAdmissions();


            /* ---------------------------------------------
               ADD NEW ADMISSION
            --------------------------------------------- */

            admissions.push(admissionData);


            /* ---------------------------------------------
               SAVE
            --------------------------------------------- */

            saveAdmissions(admissions);


            /* ---------------------------------------------
               SHOW APPLICATION NUMBER
            --------------------------------------------- */

            if (generatedAdmissionNumber) {

                generatedAdmissionNumber.textContent =
                    applicationNumber;
            }


            /* ---------------------------------------------
               SHOW SUCCESS MODAL
            --------------------------------------------- */

            if (successModal) {

                successModal.classList.add("show");

                document.body.style.overflow = "hidden";
            }


            /* ---------------------------------------------
               RESET FORM
            --------------------------------------------- */

            admissionForm.reset();


            /* ---------------------------------------------
               OPTIONAL EVENT
            --------------------------------------------- */

            window.dispatchEvent(
                new CustomEvent(
                    "edusmartAdmissionSubmitted",
                    {
                        detail: admissionData
                    }
                )
            );


            console.log(
                "EduSmart admission submitted:",
                admissionData
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE SUCCESS MODAL
    ----------------------------------------------------- */

    function closeSuccessModal() {

        if (successModal) {

            successModal.classList.remove("show");

            document.body.style.overflow = "";
        }
    }


    if (closeAdmissionSuccess) {

        closeAdmissionSuccess.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    if (successDoneButton) {

        successDoneButton.addEventListener(
            "click",
            closeSuccessModal
        );
    }


    /* -----------------------------------------------------
       CLOSE WHEN CLICKING OVERLAY
    ----------------------------------------------------- */

    if (successModal) {

        successModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "admission-success-overlay"
                    )
                ) {

                    closeSuccessModal();
                }

            }
        );
    }


    /* -----------------------------------------------------
       ESC KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                successModal &&
                successModal.classList.contains("show")
            ) {

                closeSuccessModal();
            }

        }
    );


    /* -----------------------------------------------------
       MOBILE MENU
    ----------------------------------------------------- */

    const menuButton =
        document.getElementById("schoolMenuButton");

    const navigation =
        document.querySelector(
            ".admission-page .school-nav"
        );


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "mobile-open"
                    );

                if (isOpen) {

                    navigation.style.display = "flex";

                } else {

                    navigation.style.display = "";
                }

            }
        );
    }


    /* -----------------------------------------------------
       PREVENT INVALID FUTURE DOB
    ----------------------------------------------------- */

    const dobInput =
        document.getElementById("admissionDob");

    if (dobInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dobInput.max = today;
    }

});
/* =========================================================
   EDUSMART - STUDENT ID CARD PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const idCardForm = document.getElementById("idCardForm");

    // Run only on id-card.html
    if (!idCardForm) return;


    const ADMISSION_KEY = "edusmartAdmissions";
    const STUDENT_KEY = "edusmartStudents";


    const resultArea = document.getElementById("idCardResultArea");
    const errorBox = document.getElementById("idCardError");

    const nameInput = document.getElementById("idStudentName");
    const fatherInput = document.getElementById("idFatherName");
    const phoneInput = document.getElementById("idPhone");


    const cardStudentName = document.getElementById("cardStudentName");
    const cardFatherName = document.getElementById("cardFatherName");
    const cardStudentId = document.getElementById("cardStudentId");
    const cardStudentClass = document.getElementById("cardStudentClass");
    const cardStudentGender = document.getElementById("cardStudentGender");
    const cardStudentStatus = document.getElementById("cardStudentStatus");
    const cardStudentPhone = document.getElementById("cardStudentPhone");


    const resetButton = document.getElementById("idCardResetButton");
    const printButton = document.getElementById("printIdCardButton");


    function normalize(value) {
        return String(value || "")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }


    function getStorageArray(key) {

        try {

            const data = JSON.parse(
                localStorage.getItem(key) || "[]"
            );

            return Array.isArray(data) ? data : [];

        } catch (error) {

            return [];

        }
    }


    function getValue(object, keys) {

        for (const key of keys) {

            if (
                object &&
                object[key] !== undefined &&
                object[key] !== null &&
                String(object[key]).trim() !== ""
            ) {
                return object[key];
            }

        }

        return "";

    }


    function findStudent(name, fatherName, phone) {

        const admissions = getStorageArray(ADMISSION_KEY);
        const students = getStorageArray(STUDENT_KEY);

        const allRecords = [
            ...admissions,
            ...students
        ];


        return allRecords.find(student => {

            const studentName = getValue(student, [
                "studentName",
                "name",
                "fullName"
            ]);

            const studentFather = getValue(student, [
                "fatherName",
                "father",
                "parentName"
            ]);

            const studentPhone = getValue(student, [
                "phone",
                "studentPhone",
                "contact"
            ]);


            return (
                normalize(studentName) === normalize(name) &&
                normalize(studentFather) === normalize(fatherName) &&
                normalize(studentPhone) === normalize(phone)
            );

        });

    }


    function showError(message) {

        errorBox.textContent = message;

        errorBox.style.display = "block";

    }


    function clearError() {

        errorBox.textContent = "";

        errorBox.style.display = "";

    }


    function generateStudentId(student) {

        const existingId = getValue(student, [
            "studentId",
            "id",
            "studentID",
            "registrationNumber"
        ]);

        if (existingId) {
            return existingId;
        }


        const phone = getValue(student, [
            "phone",
            "studentPhone"
        ]);

        const digits = String(phone)
            .replace(/\D/g, "")
            .slice(-6);


        if (digits) {
            return "EDU-" + digits;
        }


        return "EDU-" + String(Date.now()).slice(-6);

    }


    function displayStudent(student) {

        const name = getValue(student, [
            "studentName",
            "name",
            "fullName"
        ]);

        const father = getValue(student, [
            "fatherName",
            "father"
        ]);

        const studentClass = getValue(student, [
            "studentClass",
            "class",
            "className"
        ]);

        const gender = getValue(student, [
            "gender",
            "studentGender"
        ]);

        const status = getValue(student, [
            "status",
            "admissionStatus"
        ]) || "Active";

        const phone = getValue(student, [
            "phone",
            "studentPhone",
            "contact"
        ]);


        cardStudentName.textContent = name || "—";
        cardFatherName.textContent = father || "—";
        cardStudentId.textContent = generateStudentId(student);
        cardStudentClass.textContent = studentClass || "—";
        cardStudentGender.textContent = gender || "—";
        cardStudentStatus.textContent = status;
        cardStudentPhone.textContent = phone || "—";


        resultArea.hidden = false;

        resultArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    idCardForm.addEventListener("submit", event => {

        event.preventDefault();

        clearError();


        const name = nameInput.value.trim();
        const fatherName = fatherInput.value.trim();
        const phone = phoneInput.value.trim();


        if (!name || !fatherName || !phone) {

            showError(
                "Please enter Student Name, Father's Name and Phone Number."
            );

            return;

        }


        const student = findStudent(
            name,
            fatherName,
            phone
        );


        if (!student) {

            showError(
                "Student record not found. Please check your details and try again."
            );

            resultArea.hidden = true;

            return;

        }


        displayStudent(student);

    });


    resetButton.addEventListener("click", () => {

        idCardForm.reset();

        clearError();

        resultArea.hidden = true;

        nameInput.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    printButton.addEventListener("click", () => {

        window.print();

    });


    /* MOBILE MENU */

    const menuButton =
        document.getElementById("idCardMenuButton");

    const nav =
        document.getElementById("idCardNav");


    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

            const icon =
                menuButton.querySelector("i");

            if (nav.classList.contains("mobile-open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }

});
/* =========================================================
   EDUSMART - ADMISSION PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const admissionForm =
        document.getElementById("admissionForm");

    // Run only on admission.html
    if (!admissionForm) return;


    const ADMISSION_KEY = "edusmartAdmissions";


    const errorBox =
        document.getElementById("admissionFormError");

    const successModal =
        document.getElementById("admissionSuccessModal");

    const applicationNumberBox =
        document.getElementById("generatedApplicationNumber");

    const closeSuccessButton =
        document.getElementById("closeAdmissionSuccess");


    function getAdmissions() {

        try {

            const data = JSON.parse(
                localStorage.getItem(ADMISSION_KEY) || "[]"
            );

            return Array.isArray(data) ? data : [];

        } catch (error) {

            return [];

        }

    }


    function saveAdmissions(admissions) {

        localStorage.setItem(
            ADMISSION_KEY,
            JSON.stringify(admissions)
        );

    }


    function generateApplicationNumber() {

        const year =
            new Date().getFullYear();

        const random =
            Math.floor(
                100000 + Math.random() * 900000
            );

        return `ADM-${year}-${random}`;

    }


    function normalizePhone(phone) {

        return String(phone || "")
            .replace(/\D/g, "")
            .slice(-11);

    }


    function showError(message) {

        errorBox.textContent = message;

        errorBox.style.display = "block";

        errorBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    function clearError() {

        errorBox.textContent = "";

        errorBox.style.display = "";

    }


    admissionForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            clearError();


            const studentName =
                document
                    .getElementById("admissionStudentName")
                    .value
                    .trim();

            const fatherName =
                document
                    .getElementById("admissionFatherName")
                    .value
                    .trim();

            const gender =
                document
                    .getElementById("admissionGender")
                    .value;

            const dob =
                document
                    .getElementById("admissionDob")
                    .value;

            const studentClass =
                document
                    .getElementById("admissionClass")
                    .value;

            const phone =
                document
                    .getElementById("admissionPhone")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("admissionEmail")
                    .value
                    .trim();

            const address =
                document
                    .getElementById("admissionAddress")
                    .value
                    .trim();

            const previousSchool =
                document
                    .getElementById("admissionPreviousSchool")
                    .value
                    .trim();

            const previousClass =
                document
                    .getElementById("admissionPreviousClass")
                    .value
                    .trim();

            const previousGrade =
                document
                    .getElementById("admissionPreviousGrade")
                    .value
                    .trim();

            const emergencyName =
                document
                    .getElementById("admissionEmergencyName")
                    .value
                    .trim();

            const emergencyPhone =
                document
                    .getElementById("admissionEmergencyPhone")
                    .value
                    .trim();

            const agreement =
                document
                    .getElementById("admissionAgreement")
                    .checked;


            if (
                !studentName ||
                !fatherName ||
                !gender ||
                !dob ||
                !studentClass ||
                !phone ||
                !address
            ) {

                showError(
                    "Please complete all required fields marked with *."
                );

                return;

            }


            if (!agreement) {

                showError(
                    "Please confirm that the information provided is accurate."
                );

                return;

            }


            const phoneDigits =
                normalizePhone(phone);


            if (phoneDigits.length < 10) {

                showError(
                    "Please enter a valid phone number."
                );

                return;

            }


            if (
                email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                showError(
                    "Please enter a valid email address."
                );

                return;

            }


            const admissions =
                getAdmissions();


            const duplicate =
                admissions.find(application => {

                    const existingName =
                        String(
                            application.studentName || ""
                        )
                            .trim()
                            .toLowerCase();

                    const existingFather =
                        String(
                            application.fatherName || ""
                        )
                            .trim()
                            .toLowerCase();

                    const existingPhone =
                        normalizePhone(
                            application.phone
                        );


                    return (
                        existingName ===
                            studentName.toLowerCase() &&
                        existingFather ===
                            fatherName.toLowerCase() &&
                        existingPhone ===
                            phoneDigits
                    );

                });


            if (duplicate) {

                showError(
                    "An admission application with these details already exists."
                );

                return;

            }


            const applicationNumber =
                generateApplicationNumber();


            const application = {

                applicationNumber,

                studentName,

                fatherName,

                gender,

                dob,

                studentClass,

                phone,

                email,

                address,

                previousSchool,

                previousClass,

                previousGrade,

                emergencyName,

                emergencyPhone,

                status: "Pending",

                submittedAt:
                    new Date().toISOString()

            };


            admissions.push(application);

            saveAdmissions(admissions);


            applicationNumberBox.textContent =
                applicationNumber;


            successModal.hidden = false;

            document.body.style.overflow = "hidden";


            admissionForm.reset();

        }
    );


    function closeSuccessModal() {

        successModal.hidden = true;

        document.body.style.overflow = "";

    }


    closeSuccessButton.addEventListener(
        "click",
        closeSuccessModal
    );


    const successOverlay =
        successModal.querySelector(
            ".admission-success-overlay"
        );


    if (successOverlay) {

        successOverlay.addEventListener(
            "click",
            closeSuccessModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                !successModal.hidden
            ) {

                closeSuccessModal();

            }

        }
    );


    /* MOBILE MENU */

    const menuButton =
        document.getElementById(
            "admissionMenuButton"
        );

    const nav =
        document.getElementById(
            "admissionNav"
        );


    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "mobile-open"
                );


                const icon =
                    menuButton.querySelector("i");


                if (
                    nav.classList.contains(
                        "mobile-open"
                    )
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "mobile-open"
                        );

                        const icon =
                            menuButton.querySelector(
                                "i"
                            );

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }
                );

            });

    }

});
/* =========================================================
   EDUSMART GALLERY PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryPage = document.getElementById("galleryPage");

    // Run only on gallery.html
    if (!galleryPage) return;


    /* ================= MOBILE MENU ================= */

    const menuButton = document.getElementById("galleryMenuButton");
    const galleryNav = document.getElementById("galleryNav");

    if (menuButton && galleryNav) {

        menuButton.addEventListener("click", () => {

            galleryNav.classList.toggle("show");

            const icon = menuButton.querySelector("i");

            if (icon) {

                if (galleryNav.classList.contains("show")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        // Close menu when a link is clicked
        galleryNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                galleryNav.classList.remove("show");

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* ================= FILTER ================= */

    const filterButtons = document.querySelectorAll(
        ".gallery-filter"
    );

    const galleryItems = document.querySelectorAll(
        ".gallery-item"
    );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.getAttribute("data-gallery-filter");


            // Active button
            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            // Filter gallery
            galleryItems.forEach(item => {

                const itemCategory =
                    item.getAttribute("data-gallery-category");


                if (
                    selectedCategory === "all" ||
                    itemCategory === selectedCategory
                ) {

                    item.classList.remove("gallery-hidden");

                    // Restart animation
                    item.style.animation = "none";

                    void item.offsetWidth;

                    item.style.animation =
                        "galleryItemIn 0.5s ease both";

                } else {

                    item.classList.add("gallery-hidden");

                }

            });

        });

    });


    /* ================= LIGHTBOX ================= */

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("galleryLightboxImage");

    const lightboxCaption =
        document.getElementById("galleryLightboxCaption");

    const lightboxClose =
        document.getElementById("galleryLightboxClose");


    const viewButtons =
        document.querySelectorAll(".gallery-view-button");


    function openGalleryLightbox(imageUrl, title) {

        if (!lightbox || !lightboxImage) return;


        lightboxImage.src = imageUrl;

        lightboxImage.alt = title || "EduSmart Gallery Image";


        if (lightboxCaption) {
            lightboxCaption.textContent = title || "";
        }


        lightbox.classList.add("show");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }


    function closeGalleryLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove("show");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";


        // Clear image after closing
        setTimeout(() => {

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }, 300);

    }


    /* Open image */

    viewButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const imageUrl =
                button.getAttribute("data-gallery-image");

            const title =
                button.getAttribute("data-gallery-title");


            if (imageUrl) {
                openGalleryLightbox(
                    imageUrl,
                    title
                );
            }

        });

    });


    /* Close button */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeGalleryLightbox
        );

    }


    /* Close by clicking background */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeGalleryLightbox();
            }

        });

    }


    /* Close with Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("show")
        ) {

            closeGalleryLightbox();

        }

    });


});


/* =========================================================
   EDUSMART NOTICE PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const noticePage = document.getElementById("noticePage");

    // Run only on notice.html
    if (!noticePage) return;


    /* ================= MOBILE MENU ================= */

    const menuButton =
        document.getElementById("noticeMenuButton");

    const noticeNav =
        document.getElementById("noticeNav");


    if (menuButton && noticeNav) {

        menuButton.addEventListener("click", () => {

            noticeNav.classList.toggle("show");

            const icon =
                menuButton.querySelector("i");

            if (icon) {

                if (noticeNav.classList.contains("show")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });


        noticeNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                noticeNav.classList.remove("show");

                const icon =
                    menuButton.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* ================= NOTICE ELEMENTS ================= */

    const searchInput =
        document.getElementById("noticeSearch");

    const categoryFilter =
        document.getElementById("noticeCategoryFilter");

    const noticeList =
        document.getElementById("noticePublicList");

    const noticeEmpty =
        document.getElementById("noticeEmpty");


    /* ================= NOTICE FILTER ================= */

    function filterNotices() {

        if (!noticeList) return;


        const searchText =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const notices =
            noticeList.querySelectorAll(
                ".public-notice-card"
            );


        let visibleCount = 0;


        notices.forEach(notice => {

            const category =
                notice.getAttribute(
                    "data-notice-category"
                ) || "general";


            const noticeText =
                notice.textContent.toLowerCase();


            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;


            const searchMatch =
                !searchText ||
                noticeText.includes(searchText);


            if (categoryMatch && searchMatch) {

                notice.style.display = "";

                visibleCount++;

            } else {

                notice.style.display = "none";

            }

        });


        if (noticeEmpty) {

            if (visibleCount === 0) {

                noticeEmpty.classList.add("show");

            } else {

                noticeEmpty.classList.remove("show");

            }

        }

    }


    /* ================= SEARCH ================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterNotices
        );

    }


    /* ================= CATEGORY ================= */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterNotices
        );

    }


    /* ================= NOTICE MODAL ================= */

    const noticeModal =
        document.getElementById("noticeModal");

    const noticeModalTitle =
        document.getElementById("noticeModalTitle");

    const noticeModalContent =
        document.getElementById("noticeModalContent");

    const noticeModalClose =
        document.getElementById("noticeModalClose");

    const noticeModalButton =
        document.getElementById("noticeModalButton");

    const noticeModalOverlay =
        noticeModal
            ? noticeModal.querySelector(
                ".notice-modal-overlay"
            )
            : null;


    const readButtons =
        document.querySelectorAll(
            ".notice-read-button"
        );


    function openNoticeModal(title, content) {

        if (!noticeModal) return;


        if (noticeModalTitle) {
            noticeModalTitle.textContent =
                title || "School Notice";
        }


        if (noticeModalContent) {
            noticeModalContent.textContent =
                content || "No additional details available.";
        }


        noticeModal.classList.add("show");

        noticeModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function closeNoticeModal() {

        if (!noticeModal) return;


        noticeModal.classList.remove("show");

        noticeModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    /* Open notice */

    readButtons.forEach(button => {

        button.addEventListener("click", () => {

            const title =
                button.getAttribute(
                    "data-notice-title"
                );

            const content =
                button.getAttribute(
                    "data-notice-content"
                );


            openNoticeModal(
                title,
                content
            );

        });

    });


    /* Close buttons */

    if (noticeModalClose) {

        noticeModalClose.addEventListener(
            "click",
            closeNoticeModal
        );

    }


    if (noticeModalButton) {

        noticeModalButton.addEventListener(
            "click",
            closeNoticeModal
        );

    }


    if (noticeModalOverlay) {

        noticeModalOverlay.addEventListener(
            "click",
            closeNoticeModal
        );

    }


    /* ESC */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            noticeModal &&
            noticeModal.classList.contains("show")
        ) {

            closeNoticeModal();

        }

    });


    /* ================= LOAD ADMIN NOTICES ================= */

    function loadAdminNotices() {

        if (!noticeList) return;


        let adminNotices = [];


        try {

            adminNotices =
                JSON.parse(
                    localStorage.getItem(
                        "edusmartNotices"
                    )
                ) || [];

        } catch (error) {

            adminNotices = [];

        }


        if (!Array.isArray(adminNotices)) {
            adminNotices = [];
        }


        adminNotices.forEach(notice => {

            const title =
                notice.title ||
                notice.noticeTitle ||
                "School Notice";


            const content =
                notice.content ||
                notice.description ||
                notice.message ||
                "";


            const category =
                String(
                    notice.category ||
                    "general"
                ).toLowerCase();


            const dateValue =
                notice.date ||
                notice.createdAt ||
                "";


            let day = "--";
            let month = "---";


            if (dateValue) {

                const date =
                    new Date(dateValue);


                if (!Number.isNaN(date.getTime())) {

                    day =
                        String(
                            date.getDate()
                        ).padStart(2, "0");

                    month =
                        date.toLocaleString(
                            "en-US",
                            {
                                month: "short"
                            }
                        ).toUpperCase();

                }

            }


            const card =
                document.createElement("article");

            card.className =
                "public-notice-card";

            card.setAttribute(
                "data-notice-category",
                category
            );


            card.innerHTML = `
                <div class="public-notice-date">
                    <strong>${escapeNoticeHTML(day)}</strong>
                    <span>${escapeNoticeHTML(month)}</span>
                </div>

                <div class="public-notice-content">

                    <div class="public-notice-meta">

                        <span class="notice-tag ${escapeNoticeClass(category)}">
                            ${escapeNoticeHTML(
                                capitalizeNotice(category)
                            )}
                        </span>

                        <span>
                            <i class="fa-regular fa-clock"></i>
                            School Update
                        </span>

                    </div>

                    <h3>
                        ${escapeNoticeHTML(title)}
                    </h3>

                    <p>
                        ${escapeNoticeHTML(content)}
                    </p>

                    <button
                        type="button"
                        class="notice-read-button"
                        data-notice-title="${escapeNoticeAttribute(title)}"
                        data-notice-content="${escapeNoticeAttribute(content)}"
                    >
                        Read More
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            `;


            noticeList.appendChild(card);


            const button =
                card.querySelector(
                    ".notice-read-button"
                );


            if (button) {

                button.addEventListener(
                    "click",
                    () => {

                        openNoticeModal(
                            title,
                            content
                        );

                    }
                );

            }

        });


        filterNotices();

    }


    /* ================= HELPERS ================= */

    function escapeNoticeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function escapeNoticeAttribute(value) {

        return escapeNoticeHTML(value);

    }


    function escapeNoticeClass(value) {

        const allowed = [
            "general",
            "exam",
            "event",
            "holiday",
            "admission"
        ];

        return allowed.includes(value)
            ? value
            : "general";

    }


    function capitalizeNotice(value) {

        if (!value) return "General";

        return value.charAt(0).toUpperCase() +
            value.slice(1);

    }


    /* ================= START ================= */

    loadAdminNotices();

});
/* =========================================================
   EDUSMART RESULT PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const resultPage = document.getElementById("resultPage");

    if (!resultPage) return;


    /* =========================
       ELEMENTS
    ========================= */

    const resultSearchForm =
        document.getElementById("resultSearchForm");

    const resultStudentId =
        document.getElementById("resultStudentId");

    const resultStudentName =
        document.getElementById("resultStudentName");

    const resultFatherName =
        document.getElementById("resultFatherName");

    const resultSearchError =
        document.getElementById("resultSearchError");

    const resultOutputSection =
        document.getElementById("resultOutputSection");

    const resultStudentDisplayName =
        document.getElementById("resultStudentDisplayName");

    const resultStudentDisplayMeta =
        document.getElementById("resultStudentDisplayMeta");

    const resultStatus =
        document.getElementById("resultStatus");

    const resultSubjectCount =
        document.getElementById("resultSubjectCount");

    const resultTotalMarks =
        document.getElementById("resultTotalMarks");

    const resultPercentage =
        document.getElementById("resultPercentage");

    const resultOverallGrade =
        document.getElementById("resultOverallGrade");

    const resultTableBody =
        document.getElementById("resultTableBody");

    const resultExamName =
        document.getElementById("resultExamName");

    const resultGeneratedDate =
        document.getElementById("resultGeneratedDate");

    const resultPrintButton =
        document.getElementById("resultPrintButton");

    const resultMenuButton =
        document.getElementById("resultMenuButton");

    const resultNav =
        document.getElementById("resultNav");


    /* =========================
       MOBILE MENU
    ========================= */

    if (resultMenuButton && resultNav) {

        resultMenuButton.addEventListener("click", () => {

            resultNav.classList.toggle("open");

            const icon =
                resultMenuButton.querySelector("i");

            if (resultNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =========================
       HELPERS
    ========================= */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

    }


    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function getStorageArray(key) {

        try {

            const data =
                JSON.parse(localStorage.getItem(key) || "[]");

            return Array.isArray(data) ? data : [];

        } catch (error) {

            return [];

        }

    }


    function showError(message) {

        if (!resultSearchError) return;

        resultSearchError.textContent = message;
        resultSearchError.style.display = "block";

    }


    function clearError() {

        if (!resultSearchError) return;

        resultSearchError.textContent = "";
        resultSearchError.style.display = "none";

    }


    /* =========================
       GRADE
    ========================= */

    function calculateGrade(percentage) {

        const value = Number(percentage) || 0;

        if (value >= 80) return "A+";
        if (value >= 70) return "A";
        if (value >= 60) return "B";
        if (value >= 50) return "C";
        if (value >= 40) return "D";

        return "F";

    }


    /* =========================
       FIND STUDENT
    ========================= */

    function findStudent(name, father, studentId) {

        const students =
            getStorageArray("edusmartStudents");

        const admissions =
            getStorageArray("edusmartAdmissions");

        let student = null;


        /* Search admin students */

        student =
            students.find(item => {

                const sameName =
                    normalize(item.studentName || item.name) ===
                    normalize(name);

                const sameFather =
                    normalize(item.fatherName) ===
                    normalize(father);

                const sameId =
                    !studentId ||
                    normalize(item.studentId || item.id) ===
                    normalize(studentId);

                return sameName && sameFather && sameId;

            });


        if (student) return student;


        /* Search admission records */

        const admission =
            admissions.find(item => {

                const sameName =
                    normalize(item.studentName) ===
                    normalize(name);

                const sameFather =
                    normalize(item.fatherName) ===
                    normalize(father);

                const sameId =
                    !studentId ||
                    normalize(item.studentId || item.id) ===
                    normalize(studentId);

                return sameName && sameFather && sameId;

            });


        return admission || null;

    }


    /* =========================
       FIND RESULT
    ========================= */

    function findStudentResults(student) {

        const allResults =
            getStorageArray("edusmartResults");

        if (!student) return [];

        const studentId =
            student.studentId ||
            student.id ||
            "";

        const studentName =
            student.studentName ||
            student.name ||
            "";

        const fatherName =
            student.fatherName ||
            "";


        return allResults.filter(result => {

            const resultStudentId =
                result.studentId ||
                result.studentID ||
                result.id ||
                "";

            const resultStudentName =
                result.studentName ||
                result.name ||
                "";

            const resultFatherName =
                result.fatherName ||
                "";


            if (
                studentId &&
                resultStudentId &&
                normalize(studentId) === normalize(resultStudentId)
            ) {
                return true;
            }


            return (
                normalize(studentName) ===
                normalize(resultStudentName)
                &&
                normalize(fatherName) ===
                normalize(resultFatherName)
            );

        });

    }


    /* =========================
       BUILD SUBJECT DATA
    ========================= */

    function getSubjects(result) {

        if (!result) return [];


        if (Array.isArray(result.subjects)) {

            return result.subjects.map(item => ({

                subject:
                    item.subject ||
                    item.name ||
                    "Subject",

                obtained:
                    Number(
                        item.obtainedMarks ??
                        item.obtained ??
                        item.marks ??
                        0
                    ),

                total:
                    Number(
                        item.totalMarks ??
                        item.total ??
                        100
                    )

            }));

        }


        if (Array.isArray(result.marks)) {

            return result.marks.map(item => ({

                subject:
                    item.subject ||
                    item.name ||
                    "Subject",

                obtained:
                    Number(
                        item.obtainedMarks ??
                        item.obtained ??
                        item.marks ??
                        0
                    ),

                total:
                    Number(
                        item.totalMarks ??
                        item.total ??
                        100
                    )

            }));

        }


        return [];

    }


    /* =========================
       DISPLAY RESULT
    ========================= */

    function displayResult(student, result) {

        const subjects =
            getSubjects(result);


        if (!subjects.length) {

            showError(
                "This student's result was found, but no subject marks have been published yet."
            );

            return;

        }


        let totalObtained = 0;
        let totalMarks = 0;


        subjects.forEach(subject => {

            totalObtained += subject.obtained;
            totalMarks += subject.total;

        });


        const percentage =
            totalMarks > 0
                ? (totalObtained / totalMarks) * 100
                : 0;


        const grade =
            result.grade ||
            result.overallGrade ||
            calculateGrade(percentage);


        const studentName =
            student.studentName ||
            student.name ||
            "Student";


        const fatherName =
            student.fatherName ||
            "Not available";


        const studentClass =
            student.studentClass ||
            student.className ||
            student.class ||
            "Class not available";


        const studentId =
            student.studentId ||
            student.id ||
            result.studentId ||
            "Not assigned";


        resultStudentDisplayName.textContent =
            studentName;


        resultStudentDisplayMeta.textContent =
            `${studentId} • ${studentClass} • Father: ${fatherName}`;


        resultStatus.textContent =
            result.status ||
            "Published";


        resultSubjectCount.textContent =
            subjects.length;


        resultTotalMarks.textContent =
            `${totalObtained} / ${totalMarks}`;


        resultPercentage.textContent =
            `${percentage.toFixed(1)}%`;


        resultOverallGrade.textContent =
            grade;


        resultExamName.textContent =
            result.examName ||
            result.exam ||
            result.title ||
            "Examination Result";


        resultGeneratedDate.textContent =
            result.publishedAt ||
            result.date ||
            new Date().toLocaleDateString();


        resultTableBody.innerHTML = "";


        subjects.forEach((item, index) => {

            const subjectPercentage =
                item.total > 0
                    ? (item.obtained / item.total) * 100
                    : 0;


            const subjectGrade =
                item.grade ||
                calculateGrade(subjectPercentage);


            const row =
                document.createElement("tr");


            row.innerHTML = `
                <td>${index + 1}</td>

                <td>
                    <strong>
                        ${escapeHTML(item.subject)}
                    </strong>
                </td>

                <td>
                    ${item.obtained}
                </td>

                <td>
                    ${item.total}
                </td>

                <td>
                    ${subjectPercentage.toFixed(1)}%
                </td>

                <td>
                    <span class="result-grade">
                        ${escapeHTML(subjectGrade)}
                    </span>
                </td>
            `;


            resultTableBody.appendChild(row);

        });


        resultOutputSection.style.display = "block";


        setTimeout(() => {

            resultOutputSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =========================
       SEARCH
    ========================= */

    if (resultSearchForm) {

        resultSearchForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                clearError();


                const name =
                    resultStudentName.value.trim();

                const father =
                    resultFatherName.value.trim();

                const studentId =
                    resultStudentId.value.trim();


                if (!name || !father) {

                    showError(
                        "Please enter the student name and father name."
                    );

                    return;

                }


                const student =
                    findStudent(
                        name,
                        father,
                        studentId
                    );


                if (!student) {

                    resultOutputSection.style.display =
                        "none";

                    showError(
                        "Student record not found. Please check the entered information."
                    );

                    return;

                }


                const results =
                    findStudentResults(student);


                if (!results.length) {

                    resultOutputSection.style.display =
                        "none";

                    showError(
                        "No published result was found for this student yet."
                    );

                    return;

                }


                /* Get latest result */

                const result =
                    results[results.length - 1];


                displayResult(
                    student,
                    result
                );

            }
        );

    }


    /* =========================
       PRINT
    ========================= */

    if (resultPrintButton) {

        resultPrintButton.addEventListener(
            "click",
            () => {

                window.print();

            }
        );

    }

});

/* =========================================================
   EDUSMART PUBLIC TIMETABLE PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const timetablePage =
        document.getElementById("timetablePage");

    if (!timetablePage) return;


    const classSelect =
        document.getElementById("publicTimetableClass");

    const output =
        document.getElementById("publicTimetableOutput");

    const menuButton =
        document.getElementById("timetableMenuButton");

    const nav =
        document.getElementById("timetableNav");


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon =
                menuButton.querySelector("i");

            if (nav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================
       HELPERS
    ========================= */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

    }


    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function getTimetableData() {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(
                        "edusmartTimetable"
                    ) || "[]"
                );

            return Array.isArray(data)
                ? data
                : [];

        } catch (error) {

            return [];

        }

    }


    /* =========================
       DEFAULT DEMO DATA
       ========================= */

    function getDemoTimetable(className) {

        return [
            {
                day: "Monday",
                time: "08:00 - 08:40",
                subject: "English",
                teacher: "Class Teacher"
            },
            {
                day: "Monday",
                time: "08:40 - 09:20",
                subject: "Mathematics",
                teacher: "Mathematics Teacher"
            },
            {
                day: "Tuesday",
                time: "08:00 - 08:40",
                subject: "Science",
                teacher: "Science Teacher"
            },
            {
                day: "Tuesday",
                time: "08:40 - 09:20",
                subject: "Computer",
                teacher: "Computer Teacher"
            },
            {
                day: "Wednesday",
                time: "08:00 - 08:40",
                subject: "Urdu",
                teacher: "Urdu Teacher"
            },
            {
                day: "Wednesday",
                time: "08:40 - 09:20",
                subject: "Islamiyat",
                teacher: "Islamiyat Teacher"
            },
            {
                day: "Thursday",
                time: "08:00 - 08:40",
                subject: "Mathematics",
                teacher: "Mathematics Teacher"
            },
            {
                day: "Thursday",
                time: "08:40 - 09:20",
                subject: "English",
                teacher: "English Teacher"
            },
            {
                day: "Friday",
                time: "08:00 - 08:40",
                subject: "General Knowledge",
                teacher: "Class Teacher"
            },
            {
                day: "Friday",
                time: "08:40 - 09:20",
                subject: "Activities",
                teacher: "Activity Teacher"
            }
        ];

    }


    /* =========================
       FIND CLASS DATA
    ========================= */

    function getClassTimetable(className) {

        const allData =
            getTimetableData();


        const filtered =
            allData.filter(item => {

                const itemClass =
                    item.className ||
                    item.studentClass ||
                    item.class ||
                    "";

                return normalize(itemClass) ===
                    normalize(className);

            });


        if (filtered.length) {

            return filtered;

        }


        return getDemoTimetable(className);

    }


    /* =========================
       DISPLAY
    ========================= */

    function renderTimetable(className) {

        if (!output) return;


        if (!className) {

            output.innerHTML = `
                <div class="public-timetable-empty">

                    <div class="public-timetable-empty-icon">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>

                    <h3>
                        Select a Class
                    </h3>

                    <p>
                        Select your class above to view the
                        weekly timetable.
                    </p>

                </div>
            `;

            return;

        }


        const data =
            getClassTimetable(className);


        let rows = "";


        data.forEach((item, index) => {

            const day =
                item.day ||
                item.weekday ||
                item.dayName ||
                "-";


            const time =
                item.time ||
                item.periodTime ||
                `${item.startTime || ""} - ${item.endTime || ""}`;


            const subject =
                item.subject ||
                item.subjectName ||
                item.title ||
                "Subject";


            const teacher =
                item.teacher ||
                item.teacherName ||
                item.instructor ||
                "Teacher";


            const period =
                item.period ||
                item.periodNumber ||
                index + 1;


            rows += `
                <tr>

                    <td>
                        <span class="timetable-period">
                            Period ${escapeHTML(period)}
                        </span>
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(day)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(time)}
                    </td>

                    <td>
                        <span class="timetable-subject">
                            ${escapeHTML(subject)}
                        </span>
                    </td>

                    <td>
                        <span class="timetable-teacher">
                            ${escapeHTML(teacher)}
                        </span>
                    </td>

                </tr>
            `;

        });


        output.innerHTML = `

            <div class="public-timetable-card">

                <div class="public-timetable-card-header">

                    <div>

                        <h3>
                            Weekly Timetable
                        </h3>

                        <p>
                            Current schedule for
                            ${escapeHTML(className)}
                        </p>

                    </div>

                    <span class="public-timetable-class-badge">
                        ${escapeHTML(className)}
                    </span>

                </div>


                <div class="public-timetable-table-wrapper">

                    <table class="public-timetable-table">

                        <thead>

                            <tr>

                                <th>
                                    Period
                                </th>

                                <th>
                                    Day
                                </th>

                                <th>
                                    Time
                                </th>

                                <th>
                                    Subject
                                </th>

                                <th>
                                    Teacher
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${rows}

                        </tbody>

                    </table>

                </div>

            </div>

        `;

    }


    /* =========================
       CLASS CHANGE
    ========================= */

    if (classSelect) {

        classSelect.addEventListener(
            "change",
            () => {

                renderTimetable(
                    classSelect.value
                );


                if (classSelect.value) {

                    setTimeout(() => {

                        output.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }
        );

    }


    /* =========================
       INITIAL
    ========================= */

    renderTimetable("");

});

/* =========================================================
   EDUSMART - PUBLIC TEACHERS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const teachersPage = document.getElementById("teachersPage");

    if (!teachersPage) return;


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    const menuButton = document.getElementById("teachersMenuButton");
    const nav = document.getElementById("teachersNav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {
            nav.classList.toggle("show");
        });

        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                nav.classList.remove("show");
            });

        });
    }


    /* -----------------------------------------------------
       LOAD TEACHERS
       ----------------------------------------------------- */

    const teachersGrid = document.getElementById("publicTeachersGrid");
    const teachersEmpty = document.getElementById("teachersEmpty");
    const teacherCount = document.getElementById("publicTeacherCount");
    const searchInput = document.getElementById("teacherSearch");

    let teachers = [];


    function getTeachers() {

        try {

            const savedTeachers =
                JSON.parse(localStorage.getItem("edusmartTeachers")) || [];

            if (Array.isArray(savedTeachers)) {
                return savedTeachers;
            }

        } catch (error) {

            console.error("Unable to load teachers:", error);

        }

        return [];
    }


    /* -----------------------------------------------------
       ESCAPE HTML
       ----------------------------------------------------- */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* -----------------------------------------------------
       INITIALS
       ----------------------------------------------------- */

    function getInitials(name) {

        const words = String(name || "Teacher")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (!words.length) return "T";

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();

    }


    /* -----------------------------------------------------
       RENDER
       ----------------------------------------------------- */

    function renderTeachers(list) {

        if (!teachersGrid) return;

        teachersGrid.innerHTML = "";

        if (teacherCount) {
            teacherCount.textContent = list.length;
        }


        if (!list.length) {

            if (teachersEmpty) {
                teachersEmpty.classList.add("show");
            }

            return;
        }


        if (teachersEmpty) {
            teachersEmpty.classList.remove("show");
        }


        list.forEach(function (teacher) {

            const name =
                teacher.name ||
                teacher.teacherName ||
                "Teacher";

            const subject =
                teacher.subject ||
                teacher.subjectName ||
                teacher.specialization ||
                "General Teacher";

            const className =
                teacher.className ||
                teacher.class ||
                teacher.classes ||
                "All Classes";

            const phone =
                teacher.phone ||
                teacher.contact ||
                "Not provided";

            const experience =
                teacher.experience ||
                teacher.experienceYears ||
                "—";


            const card = document.createElement("article");

            card.className = "public-teacher-card";


            card.innerHTML = `
                <div class="public-teacher-avatar">
                    ${escapeHTML(getInitials(name))}
                </div>

                <h3>
                    ${escapeHTML(name)}
                </h3>

                <div class="public-teacher-role">
                    ${escapeHTML(subject)}
                </div>

                <div class="public-teacher-info">

                    <div>
                        <span>Class</span>
                        <span>${escapeHTML(className)}</span>
                    </div>

                    <div>
                        <span>Experience</span>
                        <span>${escapeHTML(experience)}</span>
                    </div>

                    <div>
                        <span>Contact</span>
                        <span>${escapeHTML(phone)}</span>
                    </div>

                </div>
            `;


            teachersGrid.appendChild(card);

        });

    }


    /* -----------------------------------------------------
       SEARCH
       ----------------------------------------------------- */

    function searchTeachers() {

        const query =
            String(searchInput?.value || "")
                .trim()
                .toLowerCase();


        if (!query) {

            renderTeachers(teachers);

            return;
        }


        const filtered = teachers.filter(function (teacher) {

            const searchableText = [

                teacher.name,
                teacher.teacherName,

                teacher.subject,
                teacher.subjectName,

                teacher.className,
                teacher.class,

                teacher.classes,

                teacher.phone,
                teacher.contact

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return searchableText.includes(query);

        });


        renderTeachers(filtered);

    }


    if (searchInput) {

        searchInput.addEventListener("input", searchTeachers);

    }


    /* -----------------------------------------------------
       START
       ----------------------------------------------------- */

    teachers = getTeachers();

    renderTeachers(teachers);

});/* =========================================================
   EDUSMART CLASSES PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const classesPage = document.getElementById("classesPage");

    if (!classesPage) return;


    /* ================= MOBILE MENU ================= */

    const classesMenuButton = document.getElementById("classesMenuButton");
    const classesNav = document.getElementById("classesNav");

    if (classesMenuButton && classesNav) {

        classesMenuButton.addEventListener("click", function () {

            classesNav.classList.toggle("open");

            const icon = classesMenuButton.querySelector("i");

            if (icon) {
                if (classesNav.classList.contains("open")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }

        });


        classesNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                classesNav.classList.remove("open");

                const icon = classesMenuButton.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }

            });

        });

    }


    /* ================= CLASS DETAILS ================= */

    const classButtons =
        document.querySelectorAll(".class-details-button");

    const detailsPanel =
        document.getElementById("classDetailsPanel");

    const detailsClose =
        document.getElementById("classDetailsClose");

    const detailsIcon =
        document.getElementById("classDetailsIcon");

    const detailsLevel =
        document.getElementById("classDetailsLevel");

    const detailsTitle =
        document.getElementById("classDetailsTitle");

    const detailsDescription =
        document.getElementById("classDetailsDescription");

    const detailsFocus =
        document.getElementById("classDetailsFocus");

    const detailsSubjects =
        document.getElementById("classDetailsSubjects");


    const classInformation = {

        "Play Group": {
            level: "Early Years",
            icon: "fa-shapes",
            description:
                "Play Group provides an introductory learning environment where children can develop communication, social interaction, creativity and basic classroom habits.",
            focus: [
                "Communication and language",
                "Social interaction",
                "Creative activities",
                "Basic numbers and shapes",
                "Classroom routines"
            ],
            subjects: [
                "Language Activities",
                "Basic Mathematics",
                "Art & Creativity",
                "General Awareness",
                "Activity Based Learning"
            ]
        },


        "ECED I": {
            level: "Early Years",
            icon: "fa-palette",
            description:
                "ECED I supports early childhood development through structured activities, communication practice, basic concepts and creative learning.",
            focus: [
                "Early literacy",
                "Number recognition",
                "Communication skills",
                "Creative expression",
                "Confidence building"
            ],
            subjects: [
                "English",
                "Basic Mathematics",
                "Urdu",
                "General Knowledge",
                "Art & Activity"
            ]
        },


        "ECED II": {
            level: "Early Years",
            icon: "fa-puzzle-piece",
            description:
                "ECED II prepares students for formal primary education by strengthening basic academic concepts and independent classroom participation.",
            focus: [
                "Reading readiness",
                "Writing readiness",
                "Numeracy",
                "Problem solving",
                "Classroom independence"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "General Knowledge",
                "Creative Activities"
            ]
        },


        "Class 1": {
            level: "Primary",
            icon: "fa-1",
            description:
                "Class 1 builds the core academic foundation with emphasis on literacy, numeracy, communication and everyday knowledge.",
            focus: [
                "Reading and writing",
                "Basic mathematics",
                "Communication",
                "General awareness",
                "Learning habits"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "General Knowledge",
                "Science Basics"
            ]
        },


        "Class 2": {
            level: "Primary",
            icon: "fa-2",
            description:
                "Class 2 develops stronger reading, writing and mathematical skills while encouraging students to become more independent learners.",
            focus: [
                "Reading comprehension",
                "Writing skills",
                "Mathematical operations",
                "Communication",
                "Independent learning"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "General Knowledge",
                "Science"
            ]
        },


        "Class 3": {
            level: "Primary",
            icon: "fa-3",
            description:
                "Class 3 strengthens academic understanding and introduces students to more structured problem solving and subject-based learning.",
            focus: [
                "Comprehension",
                "Problem solving",
                "Written communication",
                "Mathematical reasoning",
                "General awareness"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 4": {
            level: "Primary",
            icon: "fa-4",
            description:
                "Class 4 focuses on strengthening core concepts while developing analytical thinking, creativity and academic confidence.",
            focus: [
                "Critical thinking",
                "Written expression",
                "Mathematical reasoning",
                "Scientific understanding",
                "Creative learning"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 5": {
            level: "Primary",
            icon: "fa-5",
            description:
                "Class 5 consolidates primary-level learning and helps students prepare for more advanced academic subjects.",
            focus: [
                "Concept building",
                "Problem solving",
                "Academic writing",
                "Research awareness",
                "Examination preparation"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 6": {
            level: "Middle",
            icon: "fa-6",
            description:
                "Class 6 introduces broader subject learning and encourages students to develop stronger independent study habits.",
            focus: [
                "Independent learning",
                "Concept development",
                "Logical thinking",
                "Written communication",
                "Study skills"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 7": {
            level: "Middle",
            icon: "fa-7",
            description:
                "Class 7 develops deeper understanding across subjects while strengthening reasoning, communication and academic confidence.",
            focus: [
                "Advanced concepts",
                "Logical reasoning",
                "Problem solving",
                "Research skills",
                "Academic confidence"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 8": {
            level: "Middle",
            icon: "fa-8",
            description:
                "Class 8 prepares students for higher-level academic work through deeper concepts, analytical thinking and structured learning.",
            focus: [
                "Advanced subject concepts",
                "Critical thinking",
                "Problem solving",
                "Academic writing",
                "Examination skills"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 9": {
            level: "Secondary",
            icon: "fa-9",
            description:
                "Class 9 focuses on stronger academic preparation, subject understanding, examination skills and preparation for secondary-level studies.",
            focus: [
                "Subject concepts",
                "Analytical thinking",
                "Examination preparation",
                "Written communication",
                "Independent study"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        },


        "Class 10": {
            level: "Secondary",
            icon: "fa-graduation-cap",
            description:
                "Class 10 supports students in completing secondary education with focused academic preparation, examination readiness and future planning.",
            focus: [
                "Advanced concepts",
                "Examination preparation",
                "Problem solving",
                "Academic performance",
                "Future study planning"
            ],
            subjects: [
                "English",
                "Mathematics",
                "Urdu",
                "Science",
                "Social Studies"
            ]
        }

    };


    /* ================= OPEN DETAILS ================= */

    classButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedClass =
                button.getAttribute("data-class");

            const data =
                classInformation[selectedClass];

            if (!data) return;


            if (detailsIcon) {
                detailsIcon.innerHTML =
                    `<i class="fa-solid ${data.icon}"></i>`;
            }


            if (detailsLevel) {
                detailsLevel.textContent = data.level;
            }


            if (detailsTitle) {
                detailsTitle.textContent = selectedClass;
            }


            if (detailsDescription) {
                detailsDescription.textContent =
                    data.description;
            }


            if (detailsFocus) {

                detailsFocus.innerHTML = "";

                data.focus.forEach(function (item) {

                    const li =
                        document.createElement("li");

                    li.textContent = item;

                    detailsFocus.appendChild(li);

                });

            }


            if (detailsSubjects) {

                detailsSubjects.innerHTML = "";

                data.subjects.forEach(function (item) {

                    const li =
                        document.createElement("li");

                    li.textContent = item;

                    detailsSubjects.appendChild(li);

                });

            }


            if (detailsPanel) {

                detailsPanel.classList.add("active");

                detailsPanel.setAttribute(
                    "aria-hidden",
                    "false"
                );

                setTimeout(function () {

                    detailsPanel.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 80);

            }

        });

    });


    /* ================= CLOSE DETAILS ================= */

    if (detailsClose && detailsPanel) {

        detailsClose.addEventListener("click", function () {

            detailsPanel.classList.remove("active");

            detailsPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        });

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            detailsPanel &&
            detailsPanel.classList.contains("active")
        ) {

            detailsPanel.classList.remove("active");

            detailsPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    });


    /* ================= CURRENT YEAR ================= */

    const currentYear =
        document.getElementById("classesCurrentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

});
/* =========================================================
   GLOBAL FOOTER YEAR
   ========================================================= */

document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
});
/* =========================================================
   CONTACT PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactPage = document.getElementById("contactPage");

    if (!contactPage) return;


    /* ================= MOBILE MENU ================= */

    const menuButton = document.getElementById("contactMenuButton");
    const contactNav = document.getElementById("contactNav");

    if (menuButton && contactNav) {

        menuButton.addEventListener("click", () => {

            contactNav.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (icon) {

                if (contactNav.classList.contains("open")) {
                    icon.className = "fas fa-xmark";
                } else {
                    icon.className = "fas fa-bars";
                }

            }

        });


        contactNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                contactNav.classList.remove("open");

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.className = "fas fa-bars";
                }

            });

        });

    }


    /* ================= CONTACT FORM ================= */

    const contactForm = document.getElementById("contactForm");

    const contactName = document.getElementById("contactName");
    const contactPhone = document.getElementById("contactPhone");
    const contactEmail = document.getElementById("contactEmail");
    const contactSubject = document.getElementById("contactSubject");
    const contactMessage = document.getElementById("contactMessage");

    const contactFormError =
        document.getElementById("contactFormError");

    const contactFormSuccess =
        document.getElementById("contactFormSuccess");


    const MESSAGE_KEY = "edusmartMessages";


    /* ================= HELPERS ================= */

    function showError(message) {

        if (!contactFormError) return;

        contactFormError.textContent = message;

        contactFormError.classList.add("show");

        if (contactFormSuccess) {
            contactFormSuccess.classList.remove("show");
        }

    }


    function clearError() {

        if (!contactFormError) return;

        contactFormError.textContent = "";

        contactFormError.classList.remove("show");

    }


    function getMessages() {

        try {

            const saved =
                localStorage.getItem(MESSAGE_KEY);

            if (!saved) return [];

            const parsed = JSON.parse(saved);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Unable to read EduSmart messages:",
                error
            );

            return [];

        }

    }


    function saveMessages(messages) {

        localStorage.setItem(
            MESSAGE_KEY,
            JSON.stringify(messages)
        );

    }


    function createMessageId() {

        return (
            "MSG-" +
            Date.now().toString().slice(-8)
        );

    }


    /* ================= FORM SUBMIT ================= */

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            clearError();


            const name =
                contactName
                    ? contactName.value.trim()
                    : "";

            const phone =
                contactPhone
                    ? contactPhone.value.trim()
                    : "";

            const email =
                contactEmail
                    ? contactEmail.value.trim()
                    : "";

            const subject =
                contactSubject
                    ? contactSubject.value.trim()
                    : "";

            const message =
                contactMessage
                    ? contactMessage.value.trim()
                    : "";


            /* ================= VALIDATION ================= */

            if (!name) {

                showError(
                    "Please enter your name."
                );

                if (contactName) {
                    contactName.focus();
                }

                return;

            }


            if (name.length < 2) {

                showError(
                    "Please enter a valid name."
                );

                if (contactName) {
                    contactName.focus();
                }

                return;

            }


            if (!phone) {

                showError(
                    "Please enter your phone number."
                );

                if (contactPhone) {
                    contactPhone.focus();
                }

                return;

            }


            const phoneDigits =
                phone.replace(/\D/g, "");


            if (phoneDigits.length < 10) {

                showError(
                    "Please enter a valid phone number."
                );

                if (contactPhone) {
                    contactPhone.focus();
                }

                return;

            }


            if (email) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showError(
                        "Please enter a valid email address."
                    );

                    if (contactEmail) {
                        contactEmail.focus();
                    }

                    return;

                }

            }


            if (!subject) {

                showError(
                    "Please select a subject."
                );

                if (contactSubject) {
                    contactSubject.focus();
                }

                return;

            }


            if (!message) {

                showError(
                    "Please write your message."
                );

                if (contactMessage) {
                    contactMessage.focus();
                }

                return;

            }


            if (message.length < 5) {

                showError(
                    "Please write a little more detail in your message."
                );

                if (contactMessage) {
                    contactMessage.focus();
                }

                return;

            }


            /* ================= CREATE MESSAGE ================= */

            const messages = getMessages();

            const newMessage = {

                id: createMessageId(),

                name: name,

                phone: phone,

                email: email,

                subject: subject,

                message: message,

                status: "New",

                read: false,

                createdAt: new Date().toISOString()

            };


            messages.unshift(newMessage);

            saveMessages(messages);


            /* ================= SUCCESS ================= */

            if (contactFormSuccess) {

                contactFormSuccess.classList.add("show");

            }


            contactForm.reset();


            /* ================= HIDE SUCCESS ================= */

            setTimeout(() => {

                if (contactFormSuccess) {
                    contactFormSuccess.classList.remove("show");
                }

            }, 6000);

        });

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (contactNav) {
            contactNav.classList.remove("open");
        }

        if (menuButton) {

            const icon =
                menuButton.querySelector("i");

            if (icon) {
                icon.className = "fas fa-bars";
            }

        }

    });

});/* =========================================================
   EDUSMART ADMIN — CONTACT MESSAGES
   Contact Form → Admin Panel
========================================================= */

(function () {
    const messagesSection = document.getElementById("messagesSection");

    // Only run on admin page
    if (!messagesSection) return;

    const MESSAGES_KEY = "edusmartMessages";

    const tableBody = document.getElementById("messagesTableBody");
    const emptyState = document.getElementById("emptyMessages");
    const messageBadge = document.getElementById("messageBadge");

    function getMessages() {
        try {
            return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
        } catch (error) {
            console.error("Unable to read messages:", error);
            return [];
        }
    }

    function saveMessages(messages) {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatMessageDate(dateValue) {
        if (!dateValue) return "—";

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleString("en-PK", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function updateMessageBadge(messages) {
        if (!messageBadge) return;

        const unreadCount = messages.filter(message => {
            return message.read !== true && message.status !== "Read";
        }).length;

        messageBadge.textContent = unreadCount;

        if (unreadCount === 0) {
            messageBadge.style.display = "none";
        } else {
            messageBadge.style.display = "inline-flex";
        }
    }

    function renderMessages() {
        if (!tableBody) return;

        const messages = getMessages();

        updateMessageBadge(messages);

        if (messages.length === 0) {
            tableBody.innerHTML = "";

            if (emptyState) {
                emptyState.style.display = "block";
            }

            return;
        }

        if (emptyState) {
            emptyState.style.display = "none";
        }

        tableBody.innerHTML = messages.map(message => {

            const isRead =
                message.read === true ||
                message.status === "Read";

            return `
                <tr class="${isRead ? "" : "admin-message-unread"}">

                    <td>
                        <div class="admin-student-name">
                            ${escapeHTML(message.name)}
                        </div>

                        <div class="admin-student-sub">
                            ${escapeHTML(message.phone || "No phone")}
                        </div>
                    </td>

                    <td>
                        ${escapeHTML(message.email || "—")}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(message.subject || "No subject")}
                        </strong>
                    </td>

                    <td>
                        <div class="admin-message-preview">
                            ${escapeHTML(message.message || "")}
                        </div>
                    </td>

                    <td>
                        ${formatMessageDate(message.createdAt)}
                    </td>

                    <td>
                        <span class="admin-badge ${
                            isRead
                                ? "admin-badge-success"
                                : "admin-badge-warning"
                        }">
                            ${isRead ? "Read" : "New"}
                        </span>
                    </td>

                    <td>
                        <div class="admin-actions">

                            <button
                                type="button"
                                class="admin-icon-btn edit"
                                title="${isRead ? "Mark as unread" : "Mark as read"}"
                                data-message-action="toggle"
                                data-message-id="${escapeHTML(message.id)}"
                            >
                                <i class="fa-solid ${
                                    isRead
                                        ? "fa-envelope"
                                        : "fa-envelope-open"
                                }"></i>
                            </button>

                            <button
                                type="button"
                                class="admin-icon-btn delete"
                                title="Delete message"
                                data-message-action="delete"
                                data-message-id="${escapeHTML(message.id)}"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>
                    </td>

                </tr>
            `;
        }).join("");
    }

    function toggleMessage(messageId) {
        const messages = getMessages();

        const message = messages.find(item => {
            return String(item.id) === String(messageId);
        });

        if (!message) return;

        message.read = !(
            message.read === true ||
            message.status === "Read"
        );

        message.status = message.read ? "Read" : "New";

        saveMessages(messages);
        renderMessages();

        if (typeof window.showAdminToast === "function") {
            window.showAdminToast(
                message.read
                    ? "Message marked as read."
                    : "Message marked as unread."
            );
        }
    }

    function deleteMessage(messageId) {
        const messages = getMessages();

        const message = messages.find(item => {
            return String(item.id) === String(messageId);
        });

        if (!message) return;

        const confirmed = confirm(
            `Delete message from ${message.name || "this user"}?`
        );

        if (!confirmed) return;

        const updatedMessages = messages.filter(item => {
            return String(item.id) !== String(messageId);
        });

        saveMessages(updatedMessages);
        renderMessages();

        if (typeof window.showAdminToast === "function") {
            window.showAdminToast("Message deleted successfully.");
        }
    }

    // Message buttons
    document.addEventListener("click", function (event) {

        const button = event.target.closest(
            "[data-message-action]"
        );

        if (!button) return;

        const action = button.dataset.messageAction;
        const messageId = button.dataset.messageId;

        if (!messageId) return;

        if (action === "toggle") {
            toggleMessage(messageId);
        }

        if (action === "delete") {
            deleteMessage(messageId);
        }
    });

    // Refresh messages whenever Messages section is opened
    document.addEventListener("click", function (event) {

        const navItem = event.target.closest(
            '[data-section="messagesSection"]'
        );

        if (navItem) {
            setTimeout(renderMessages, 50);
        }
    });

    // Listen for localStorage changes from other tabs
    window.addEventListener("storage", function (event) {

        if (event.key === MESSAGES_KEY) {
            renderMessages();
        }
    });

    // Initial load
    renderMessages();

    // Make available if needed elsewhere
    window.refreshEduSmartMessages = renderMessages;

})();/* =========================================================
   EDUSMART — TEACHERS DATABASE CONNECTION
   Admin Teachers → Public teachers.html
========================================================= */

(function () {

    const teachersSection = document.getElementById("teachersSection");

    // Only run when admin teachers section exists
    if (!teachersSection) return;

    const TEACHERS_KEY = "edusmartTeachers";

    const teachersGrid = document.getElementById("teachersGrid");
    const addTeacherBtn = document.getElementById("addTeacherBtn");

    function getTeachers() {
        try {
            return JSON.parse(localStorage.getItem(TEACHERS_KEY)) || [];
        } catch (error) {
            console.error("Unable to load teachers:", error);
            return [];
        }
    }

    function saveTeachers(teachers) {
        localStorage.setItem(
            TEACHERS_KEY,
            JSON.stringify(teachers)
        );
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function renderAdminTeachers() {

        if (!teachersGrid) return;

        const teachers = getTeachers();

        if (teachers.length === 0) {

            teachersGrid.innerHTML = `
                <div class="admin-empty-state">
                    <div class="admin-empty-icon">
                        <i class="fa-solid fa-chalkboard-user"></i>
                    </div>

                    <h3>No Teachers Added</h3>

                    <p>
                        Add your first teacher to display
                        them here.
                    </p>
                </div>
            `;

            return;
        }

        teachersGrid.innerHTML = teachers.map((teacher, index) => {

            const name =
                teacher.name ||
                teacher.teacherName ||
                "Teacher";

            const subject =
                teacher.subject ||
                teacher.subjectName ||
                teacher.specialization ||
                "General";

            const className =
                teacher.className ||
                teacher.class ||
                teacher.classes ||
                "All Classes";

            const phone =
                teacher.phone ||
                teacher.contact ||
                "";

            const experience =
                teacher.experience ||
                teacher.experienceYears ||
                "";

            const initials = name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map(word => word.charAt(0))
                .join("")
                .toUpperCase();

            return `
                <div class="admin-teacher-card">

                    <div class="admin-teacher-avatar">
                        ${escapeHTML(initials)}
                    </div>

                    <div class="admin-teacher-info">

                        <h3>
                            ${escapeHTML(name)}
                        </h3>

                        <p>
                            ${escapeHTML(subject)}
                        </p>

                        <span class="admin-period">
                            ${escapeHTML(className)}
                        </span>

                        ${
                            experience
                                ? `
                                    <small>
                                        ${escapeHTML(experience)}
                                        ${
                                            /^\d+$/.test(String(experience))
                                                ? " Years Experience"
                                                : ""
                                        }
                                    </small>
                                `
                                : ""
                        }

                        ${
                            phone
                                ? `
                                    <small>
                                        <i class="fa-solid fa-phone"></i>
                                        ${escapeHTML(phone)}
                                    </small>
                                `
                                : ""
                        }

                    </div>

                    <div class="admin-actions">

                        <button
                            type="button"
                            class="admin-icon-btn edit"
                            title="Edit Teacher"
                            data-teacher-action="edit"
                            data-teacher-index="${index}"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button
                            type="button"
                            class="admin-icon-btn delete"
                            title="Delete Teacher"
                            data-teacher-action="delete"
                            data-teacher-index="${index}"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </div>
            `;

        }).join("");
    }


    /*
       -------------------------------------------------------
       ADD TEACHER BUTTON
       -------------------------------------------------------
    */

    if (addTeacherBtn) {

        addTeacherBtn.addEventListener("click", function () {

            /*
             * If your existing admin.html already has
             * a teacher modal, let the existing button
             * handler open it.
             */

            const teacherModal =
                document.getElementById("teacherModal");

            if (teacherModal) {

                teacherModal.classList.add("active");

                teacherModal.style.display = "flex";

            } else {

                openSimpleTeacherForm();

            }

        });

    }


    /*
       -------------------------------------------------------
       SIMPLE TEACHER FORM
       -------------------------------------------------------
    */

    function openSimpleTeacherForm() {

        const name = prompt("Enter teacher name:");

        if (!name || !name.trim()) return;

        const subject = prompt("Enter subject:");

        if (!subject || !subject.trim()) return;

        const className = prompt(
            "Enter class (example: Class 5):"
        );

        const phone = prompt(
            "Enter teacher phone number:"
        );

        const experience = prompt(
            "Enter experience in years:"
        );

        const teachers = getTeachers();

        teachers.push({

            id:
                "TCH-" +
                Date.now().toString().slice(-8),

            name: name.trim(),

            subject:
                subject.trim(),

            className:
                className
                    ? className.trim()
                    : "All Classes",

            phone:
                phone
                    ? phone.trim()
                    : "",

            experience:
                experience
                    ? experience.trim()
                    : "",

            createdAt:
                new Date().toISOString()

        });

        saveTeachers(teachers);

        renderAdminTeachers();

        showTeacherMessage(
            "Teacher added successfully."
        );

    }


    /*
       -------------------------------------------------------
       EDIT / DELETE
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-teacher-action]"
                );

            if (!button) return;

            const action =
                button.dataset.teacherAction;

            const index =
                Number(
                    button.dataset.teacherIndex
                );

            const teachers =
                getTeachers();

            if (
                !teachers[index]
            ) return;


            // DELETE
            if (action === "delete") {

                const teacher =
                    teachers[index];

                const confirmed =
                    confirm(
                        `Delete ${teacher.name || teacher.teacherName || "this teacher"}?`
                    );

                if (!confirmed) return;

                teachers.splice(index, 1);

                saveTeachers(teachers);

                renderAdminTeachers();

                showTeacherMessage(
                    "Teacher deleted successfully."
                );

                return;
            }


            // EDIT
            if (action === "edit") {

                const teacher =
                    teachers[index];

                const currentName =
                    teacher.name ||
                    teacher.teacherName ||
                    "";

                const currentSubject =
                    teacher.subject ||
                    teacher.subjectName ||
                    "";

                const currentClass =
                    teacher.className ||
                    teacher.class ||
                    "";

                const currentPhone =
                    teacher.phone ||
                    teacher.contact ||
                    "";

                const currentExperience =
                    teacher.experience ||
                    teacher.experienceYears ||
                    "";


                const name =
                    prompt(
                        "Teacher name:",
                        currentName
                    );

                if (
                    name === null ||
                    !name.trim()
                ) return;


                const subject =
                    prompt(
                        "Subject:",
                        currentSubject
                    );

                if (
                    subject === null ||
                    !subject.trim()
                ) return;


                const className =
                    prompt(
                        "Class:",
                        currentClass
                    );


                const phone =
                    prompt(
                        "Phone:",
                        currentPhone
                    );


                const experience =
                    prompt(
                        "Experience:",
                        currentExperience
                    );


                teachers[index] = {

                    ...teacher,

                    name:
                        name.trim(),

                    subject:
                        subject.trim(),

                    className:
                        className
                            ? className.trim()
                            : currentClass,

                    phone:
                        phone
                            ? phone.trim()
                            : currentPhone,

                    experience:
                        experience
                            ? experience.trim()
                            : currentExperience

                };


                saveTeachers(teachers);

                renderAdminTeachers();

                showTeacherMessage(
                    "Teacher updated successfully."
                );

            }

        }
    );


    /*
       -------------------------------------------------------
       TOAST / MESSAGE
       -------------------------------------------------------
    */

    function showTeacherMessage(message) {

        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(message);

            return;
        }

        console.log(message);

    }


    /*
       -------------------------------------------------------
       STORAGE UPDATE
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === TEACHERS_KEY
            ) {

                renderAdminTeachers();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdminTeachers();


    /*
       Make function available globally
    */

    window.refreshEduSmartTeachers =
        renderAdminTeachers;

})();/* =========================================================
   EDUSMART — NOTICES DATABASE CONNECTION
   Admin Notices → Public notice.html
========================================================= */

(function () {

    const noticesSection =
        document.getElementById("noticesSection");

    if (!noticesSection) return;

    const NOTICES_KEY = "edusmartNotices";

    const noticesGrid =
        document.getElementById("adminNoticesGrid");

    const addNoticeBtn =
        document.getElementById("addNoticeBtn");


    function getNotices() {
        try {
            return JSON.parse(
                localStorage.getItem(NOTICES_KEY)
            ) || [];
        } catch (error) {
            console.error(
                "Unable to load notices:",
                error
            );

            return [];
        }
    }


    function saveNotices(notices) {

        localStorage.setItem(
            NOTICES_KEY,
            JSON.stringify(notices)
        );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function formatNoticeDate(dateValue) {

        if (!dateValue) return "—";

        const date =
            new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleDateString(
            "en-PK",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function renderAdminNotices() {

        if (!noticesGrid) return;

        const notices =
            getNotices();


        if (notices.length === 0) {

            noticesGrid.innerHTML = `
                <div class="admin-empty-state">

                    <div class="admin-empty-icon">
                        <i class="fa-solid fa-bullhorn"></i>
                    </div>

                    <h3>No Notices Added</h3>

                    <p>
                        Add a notice to display it here.
                    </p>

                </div>
            `;

            return;

        }


        noticesGrid.innerHTML =
            notices.map(
                (notice, index) => {

                    const title =
                        notice.title ||
                        notice.noticeTitle ||
                        "Untitled Notice";


                    const content =
                        notice.content ||
                        notice.message ||
                        notice.description ||
                        "";


                    const category =
                        notice.category ||
                        "General";


                    const date =
                        notice.date ||
                        notice.createdAt ||
                        notice.publishDate;


                    return `
                        <div class="admin-notice-card">

                            <div class="notice-date">
                                ${escapeHTML(
                                    formatNoticeDate(date)
                                )}
                            </div>

                            <div class="admin-notice-content">

                                <span class="admin-badge">
                                    ${escapeHTML(
                                        category
                                    )}
                                </span>

                                <h3>
                                    ${escapeHTML(
                                        title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        content
                                    )}
                                </p>

                            </div>

                            <div class="admin-actions">

                                <button
                                    type="button"
                                    class="admin-icon-btn edit"
                                    title="Edit Notice"
                                    data-notice-action="edit"
                                    data-notice-index="${index}"
                                >
                                    <i class="fa-solid fa-pen"></i>
                                </button>

                                <button
                                    type="button"
                                    class="admin-icon-btn delete"
                                    title="Delete Notice"
                                    data-notice-action="delete"
                                    data-notice-index="${index}"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </div>
                    `;

                }
            ).join("");

    }


    /*
       -------------------------------------------------------
       ADD NOTICE
       -------------------------------------------------------
    */

    if (addNoticeBtn) {

        addNoticeBtn.addEventListener(
            "click",
            function () {

                const noticeModal =
                    document.getElementById(
                        "noticeModal"
                    );


                if (noticeModal) {

                    noticeModal.classList.add(
                        "active"
                    );

                    noticeModal.style.display =
                        "flex";

                    return;

                }


                openSimpleNoticeForm();

            }
        );

    }


    /*
       -------------------------------------------------------
       SIMPLE NOTICE FORM
       -------------------------------------------------------
    */

    function openSimpleNoticeForm() {

        const title =
            prompt("Enter notice title:");

        if (
            !title ||
            !title.trim()
        ) return;


        const content =
            prompt("Enter notice content:");

        if (
            !content ||
            !content.trim()
        ) return;


        const category =
            prompt(
                "Enter category: General / Exam / Event / Holiday / Admission",
                "General"
            );


        const notices =
            getNotices();


        notices.unshift({

            id:
                "NOTICE-" +
                Date.now()
                    .toString()
                    .slice(-8),

            title:
                title.trim(),

            content:
                content.trim(),

            category:
                category
                    ? category.trim()
                    : "General",

            date:
                new Date().toISOString(),

            createdAt:
                new Date().toISOString(),

            published:
                true

        });


        saveNotices(notices);

        renderAdminNotices();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                "Notice added successfully."
            );

        }

    }


    /*
       -------------------------------------------------------
       EDIT / DELETE
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-notice-action]"
                );

            if (!button) return;


            const action =
                button.dataset.noticeAction;


            const index =
                Number(
                    button.dataset.noticeIndex
                );


            const notices =
                getNotices();


            if (!notices[index]) return;


            /*
               DELETE
            */

            if (action === "delete") {

                const notice =
                    notices[index];


                const confirmed =
                    confirm(
                        `Delete "${notice.title || "this notice"}"?`
                    );


                if (!confirmed) return;


                notices.splice(
                    index,
                    1
                );


                saveNotices(notices);

                renderAdminNotices();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Notice deleted successfully."
                    );

                }

                return;

            }


            /*
               EDIT
            */

            if (action === "edit") {

                const notice =
                    notices[index];


                const currentTitle =
                    notice.title ||
                    notice.noticeTitle ||
                    "";


                const currentContent =
                    notice.content ||
                    notice.message ||
                    notice.description ||
                    "";


                const currentCategory =
                    notice.category ||
                    "General";


                const title =
                    prompt(
                        "Notice title:",
                        currentTitle
                    );


                if (
                    title === null ||
                    !title.trim()
                ) return;


                const content =
                    prompt(
                        "Notice content:",
                        currentContent
                    );


                if (
                    content === null ||
                    !content.trim()
                ) return;


                const category =
                    prompt(
                        "Category:",
                        currentCategory
                    );


                notices[index] = {

                    ...notice,

                    title:
                        title.trim(),

                    content:
                        content.trim(),

                    category:
                        category
                            ? category.trim()
                            : currentCategory,

                    updatedAt:
                        new Date().toISOString()

                };


                saveNotices(notices);

                renderAdminNotices();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Notice updated successfully."
                    );

                }

            }

        }
    );


    /*
       -------------------------------------------------------
       STORAGE SYNC
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === NOTICES_KEY
            ) {

                renderAdminNotices();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdminNotices();


    window.refreshEduSmartNotices =
        renderAdminNotices;

})();/* =========================================================
   EDUSMART — TIMETABLE DATABASE CONNECTION
   Admin Timetable → Public timetable.html + Student Portal
========================================================= */

(function () {

    const timetableSection =
        document.getElementById("timetableSection");

    if (!timetableSection) return;

    const TIMETABLE_KEY = "edusmartTimetable";

    const timetableGrid =
        document.getElementById("timetableGrid");

    const addTimetableBtn =
        document.getElementById("addTimetableBtn");


    function getTimetable() {
        try {
            return JSON.parse(
                localStorage.getItem(TIMETABLE_KEY)
            ) || [];
        } catch (error) {
            console.error(
                "Unable to load timetable:",
                error
            );
            return [];
        }
    }


    function saveTimetable(data) {
        localStorage.setItem(
            TIMETABLE_KEY,
            JSON.stringify(data)
        );
    }


    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function renderAdminTimetable() {

        if (!timetableGrid) return;

        const data = getTimetable();

        if (data.length === 0) {

            timetableGrid.innerHTML = `
                <div class="admin-empty-state">

                    <div class="admin-empty-icon">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>

                    <h3>No Timetable Added</h3>

                    <p>
                        Add timetable periods to display
                        them here.
                    </p>

                </div>
            `;

            return;
        }


        timetableGrid.innerHTML = data.map(
            (item, index) => {

                const day =
                    item.day ||
                    item.weekday ||
                    item.dayName ||
                    "Day";


                const time =
                    item.time ||
                    item.periodTime ||
                    (
                        item.start && item.end
                            ? `${item.start} - ${item.end}`
                            : "Time"
                    );


                const subject =
                    item.subject ||
                    item.subjectName ||
                    item.title ||
                    "Subject";


                const teacher =
                    item.teacher ||
                    item.teacherName ||
                    item.instructor ||
                    "Teacher";


                const className =
                    item.className ||
                    item.studentClass ||
                    item.class ||
                    "All Classes";


                const period =
                    item.period ||
                    item.periodNumber ||
                    index + 1;


                return `
                    <div class="admin-period">

                        <div class="admin-period-time">
                            ${escapeHTML(time)}
                        </div>

                        <div>
                            <strong>
                                ${escapeHTML(subject)}
                            </strong>

                            <span>
                                ${escapeHTML(teacher)}
                            </span>

                            <small>
                                ${escapeHTML(className)}
                                • Period ${escapeHTML(period)}
                            </small>
                        </div>

                        <div class="admin-actions">

                            <button
                                type="button"
                                class="admin-icon-btn edit"
                                title="Edit Timetable"
                                data-timetable-action="edit"
                                data-timetable-index="${index}"
                            >
                                <i class="fa-solid fa-pen"></i>
                            </button>

                            <button
                                type="button"
                                class="admin-icon-btn delete"
                                title="Delete Timetable"
                                data-timetable-action="delete"
                                data-timetable-index="${index}"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>
                `;

            }
        ).join("");

    }


    /*
       -------------------------------------------------------
       ADD TIMETABLE
       -------------------------------------------------------
    */

    if (addTimetableBtn) {

        addTimetableBtn.addEventListener(
            "click",
            function () {

                openTimetableForm();

            }
        );

    }


    function openTimetableForm() {

        const className =
            prompt(
                "Class:",
                "Class 10"
            );

        if (
            !className ||
            !className.trim()
        ) return;


        const day =
            prompt(
                "Day:",
                "Monday"
            );

        if (
            !day ||
            !day.trim()
        ) return;


        const time =
            prompt(
                "Time:",
                "08:00 AM - 08:45 AM"
            );

        if (
            !time ||
            !time.trim()
        ) return;


        const subject =
            prompt(
                "Subject:",
                "Mathematics"
            );

        if (
            !subject ||
            !subject.trim()
        ) return;


        const teacher =
            prompt(
                "Teacher:",
                "Teacher Name"
            );

        if (
            !teacher ||
            !teacher.trim()
        ) return;


        const period =
            prompt(
                "Period number:",
                "1"
            );


        const data =
            getTimetable();


        data.push({

            id:
                "TT-" +
                Date.now()
                    .toString()
                    .slice(-8),

            className:
                className.trim(),

            day:
                day.trim(),

            time:
                time.trim(),

            subject:
                subject.trim(),

            teacher:
                teacher.trim(),

            period:
                period
                    ? period.trim()
                    : "1",

            createdAt:
                new Date().toISOString()

        });


        saveTimetable(data);

        renderAdminTimetable();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                "Timetable added successfully."
            );

        }

    }


    /*
       -------------------------------------------------------
       EDIT / DELETE
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-timetable-action]"
                );

            if (!button) return;


            const action =
                button.dataset.timetableAction;


            const index =
                Number(
                    button.dataset.timetableIndex
                );


            const data =
                getTimetable();


            if (!data[index]) return;


            /*
               DELETE
            */

            if (action === "delete") {

                const confirmed =
                    confirm(
                        "Delete this timetable period?"
                    );


                if (!confirmed) return;


                data.splice(
                    index,
                    1
                );


                saveTimetable(data);

                renderAdminTimetable();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Timetable deleted successfully."
                    );

                }

                return;
            }


            /*
               EDIT
            */

            if (action === "edit") {

                const item =
                    data[index];


                const className =
                    prompt(
                        "Class:",
                        item.className ||
                        item.studentClass ||
                        item.class ||
                        ""
                    );


                if (
                    className === null ||
                    !className.trim()
                ) return;


                const day =
                    prompt(
                        "Day:",
                        item.day ||
                        item.weekday ||
                        ""
                    );


                if (
                    day === null ||
                    !day.trim()
                ) return;


                const time =
                    prompt(
                        "Time:",
                        item.time ||
                        item.periodTime ||
                        ""
                    );


                if (
                    time === null ||
                    !time.trim()
                ) return;


                const subject =
                    prompt(
                        "Subject:",
                        item.subject ||
                        item.subjectName ||
                        ""
                    );


                if (
                    subject === null ||
                    !subject.trim()
                ) return;


                const teacher =
                    prompt(
                        "Teacher:",
                        item.teacher ||
                        item.teacherName ||
                        ""
                    );


                if (
                    teacher === null ||
                    !teacher.trim()
                ) return;


                const period =
                    prompt(
                        "Period:",
                        item.period ||
                        item.periodNumber ||
                        "1"
                    );


                data[index] = {

                    ...item,

                    className:
                        className.trim(),

                    day:
                        day.trim(),

                    time:
                        time.trim(),

                    subject:
                        subject.trim(),

                    teacher:
                        teacher.trim(),

                    period:
                        period
                            ? period.trim()
                            : "1",

                    updatedAt:
                        new Date().toISOString()

                };


                saveTimetable(data);

                renderAdminTimetable();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Timetable updated successfully."
                    );

                }

            }

        }
    );


    /*
       -------------------------------------------------------
       STORAGE SYNC
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === TIMETABLE_KEY
            ) {

                renderAdminTimetable();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdminTimetable();


    window.refreshEduSmartTimetable =
        renderAdminTimetable;

})();/* =========================================================
   EDUSMART — RESULTS DATABASE CONNECTION
   Admin Results → Public Result Page + Student Portal
========================================================= */

(function () {

    const resultsSection =
        document.getElementById("resultsSection");

    if (!resultsSection) return;

    const RESULTS_KEY = "edusmartResults";

    const resultsTableBody =
        document.getElementById("resultsTableBody");

    const addResultBtn =
        document.getElementById("addResultBtn");


    function getResults() {

        try {
            return JSON.parse(
                localStorage.getItem(RESULTS_KEY)
            ) || [];
        } catch (error) {

            console.error(
                "Unable to load results:",
                error
            );

            return [];
        }

    }


    function saveResults(results) {

        localStorage.setItem(
            RESULTS_KEY,
            JSON.stringify(results)
        );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function calculateAverage(subjects) {

        if (!Array.isArray(subjects) ||
            subjects.length === 0) {
            return 0;
        }

        let obtained = 0;
        let total = 0;

        subjects.forEach(subject => {

            obtained += Number(
                subject.obtained ??
                subject.marks ??
                subject.marksObtained ??
                0
            );

            total += Number(
                subject.total ??
                subject.totalMarks ??
                100
            );

        });

        if (total === 0) return 0;

        return Math.round(
            (obtained / total) * 100
        );

    }


    function getGrade(percentage) {

        if (percentage >= 80) return "A+";
        if (percentage >= 70) return "A";
        if (percentage >= 60) return "B";
        if (percentage >= 50) return "C";
        if (percentage >= 40) return "D";

        return "F";

    }


    function renderAdminResults() {

        if (!resultsTableBody) return;

        const results =
            getResults();


        if (results.length === 0) {

            resultsTableBody.innerHTML = "";

            return;

        }


        resultsTableBody.innerHTML =
            results.map(
                (result, index) => {

                    const studentName =
                        result.studentName ||
                        result.name ||
                        "Student";


                    const studentId =
                        result.studentId ||
                        result.id ||
                        "—";


                    const className =
                        result.className ||
                        result.studentClass ||
                        result.class ||
                        "—";


                    const subjects =
                        Array.isArray(
                            result.subjects
                        )
                            ? result.subjects
                            : Array.isArray(
                                result.marks
                            )
                                ? result.marks
                                : [];


                    const percentage =
                        Number(
                            result.percentage ??
                            result.average ??
                            calculateAverage(
                                subjects
                            )
                        );


                    const grade =
                        result.grade ||
                        getGrade(
                            percentage
                        );


                    return `
                        <tr>

                            <td>
                                <div class="admin-student-name">
                                    ${escapeHTML(
                                        studentName
                                    )}
                                </div>

                                <div class="admin-student-sub">
                                    ${escapeHTML(
                                        studentId
                                    )}
                                </div>
                            </td>

                            <td>
                                ${escapeHTML(
                                    className
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    percentage
                                )}%
                            </td>

                            <td>
                                <span class="admin-badge admin-badge-success">
                                    ${escapeHTML(
                                        grade
                                    )}
                                </span>
                            </td>

                            <td>
                                <div class="admin-actions">

                                    <button
                                        type="button"
                                        class="admin-icon-btn edit"
                                        title="Edit Result"
                                        data-result-action="edit"
                                        data-result-index="${index}"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                    </button>

                                    <button
                                        type="button"
                                        class="admin-icon-btn delete"
                                        title="Delete Result"
                                        data-result-action="delete"
                                        data-result-index="${index}"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>

                                </div>
                            </td>

                        </tr>
                    `;

                }
            ).join("");

    }


    /*
       -------------------------------------------------------
       ADD RESULT
       -------------------------------------------------------
    */

    if (addResultBtn) {

        addResultBtn.addEventListener(
            "click",
            function () {

                openResultForm();

            }
        );

    }


    function openResultForm() {

        const studentId =
            prompt(
                "Student ID:",
                "EDU-1001"
            );

        if (
            !studentId ||
            !studentId.trim()
        ) return;


        const studentName =
            prompt(
                "Student Name:"
            );

        if (
            !studentName ||
            !studentName.trim()
        ) return;


        const fatherName =
            prompt(
                "Father Name:"
            );

        if (
            !fatherName ||
            !fatherName.trim()
        ) return;


        const className =
            prompt(
                "Class:",
                "Class 10"
            );

        if (
            !className ||
            !className.trim()
        ) return;


        const subjectText =
            prompt(
                "Subjects (example: English=85, Math=90, Science=78):"
            );

        if (
            !subjectText ||
            !subjectText.trim()
        ) return;


        const subjects =
            subjectText
                .split(",")
                .map(item => {

                    const parts =
                        item.split("=");

                    const subject =
                        parts[0]
                            ? parts[0].trim()
                            : "Subject";

                    const obtained =
                        Number(
                            parts[1]
                                ? parts[1].trim()
                                : 0
                        );

                    return {

                        subject,

                        obtained,

                        total: 100

                    };

                });


        const percentage =
            calculateAverage(
                subjects
            );


        const grade =
            getGrade(
                percentage
            );


        const results =
            getResults();


        results.unshift({

            id:
                "RES-" +
                Date.now()
                    .toString()
                    .slice(-8),

            studentId:
                studentId.trim(),

            studentName:
                studentName.trim(),

            fatherName:
                fatherName.trim(),

            className:
                className.trim(),

            subjects,

            percentage,

            average:
                percentage,

            grade,

            published:
                true,

            createdAt:
                new Date().toISOString()

        });


        saveResults(results);

        renderAdminResults();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                "Result added successfully."
            );

        }

    }


    /*
       -------------------------------------------------------
       EDIT / DELETE
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-result-action]"
                );

            if (!button) return;


            const action =
                button.dataset.resultAction;


            const index =
                Number(
                    button.dataset.resultIndex
                );


            const results =
                getResults();


            if (!results[index]) return;


            /*
               DELETE
            */

            if (action === "delete") {

                const confirmed =
                    confirm(
                        "Delete this result?"
                    );


                if (!confirmed) return;


                results.splice(
                    index,
                    1
                );


                saveResults(results);

                renderAdminResults();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Result deleted successfully."
                    );

                }

                return;

            }


            /*
               EDIT
            */

            if (action === "edit") {

                const result =
                    results[index];


                const currentName =
                    result.studentName ||
                    result.name ||
                    "";


                const currentClass =
                    result.className ||
                    result.studentClass ||
                    result.class ||
                    "";


                const currentPercentage =
                    result.percentage ??
                    result.average ??
                    0;


                const studentName =
                    prompt(
                        "Student Name:",
                        currentName
                    );


                if (
                    studentName === null ||
                    !studentName.trim()
                ) return;


                const className =
                    prompt(
                        "Class:",
                        currentClass
                    );


                if (
                    className === null ||
                    !className.trim()
                ) return;


                const percentage =
                    prompt(
                        "Percentage:",
                        currentPercentage
                    );


                if (
                    percentage === null
                ) return;


                const numericPercentage =
                    Number(
                        percentage
                    );


                result.studentName =
                    studentName.trim();

                result.className =
                    className.trim();

                result.percentage =
                    numericPercentage;

                result.average =
                    numericPercentage;

                result.grade =
                    getGrade(
                        numericPercentage
                    );

                result.updatedAt =
                    new Date().toISOString();


                saveResults(results);

                renderAdminResults();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Result updated successfully."
                    );

                }

            }

        }
    );


    /*
       -------------------------------------------------------
       STORAGE SYNC
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === RESULTS_KEY
            ) {

                renderAdminResults();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdminResults();


    window.refreshEduSmartResults =
        renderAdminResults;

})();/* =========================================================
   EDUSMART — STUDENTS DATABASE CONNECTION
   Admin Students → Student Portal + ID Card
========================================================= */

(function () {

    const studentsSection =
        document.getElementById("studentsSection");

    if (!studentsSection) return;

    const STUDENTS_KEY = "edusmartStudents";
    const ADMISSIONS_KEY = "edusmartAdmissions";

    const studentsTableBody =
        document.getElementById("studentsTableBody");

    const addStudentBtn =
        document.getElementById("addStudentBtn");


    function getStudents() {

        try {
            return JSON.parse(
                localStorage.getItem(STUDENTS_KEY)
            ) || [];
        } catch (error) {
            console.error(
                "Unable to load students:",
                error
            );
            return [];
        }

    }


    function saveStudents(students) {

        localStorage.setItem(
            STUDENTS_KEY,
            JSON.stringify(students)
        );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function generateStudentId() {

        const students =
            getStudents();

        let number = 1001;

        const ids =
            students.map(
                student =>
                    String(
                        student.studentId ||
                        student.id ||
                        ""
                    )
            );

        while (
            ids.includes(
                `EDU-${number}`
            )
        ) {
            number++;
        }

        return `EDU-${number}`;

    }


    function renderAdminStudents() {

        if (!studentsTableBody) return;

        const students =
            getStudents();


        if (students.length === 0) {

            studentsTableBody.innerHTML = "";

            return;

        }


        studentsTableBody.innerHTML =
            students.map(
                (student, index) => {

                    const studentId =
                        student.studentId ||
                        student.id ||
                        "—";


                    const name =
                        student.name ||
                        student.studentName ||
                        "Student";


                    const father =
                        student.fatherName ||
                        student.father ||
                        "—";


                    const className =
                        student.className ||
                        student.studentClass ||
                        student.class ||
                        "—";


                    const phone =
                        student.phone ||
                        student.contact ||
                        "—";


                    const status =
                        student.status ||
                        "Active";


                    return `
                        <tr>

                            <td>
                                <div class="admin-student-name">
                                    ${escapeHTML(name)}
                                </div>

                                <div class="admin-student-sub">
                                    ${escapeHTML(studentId)}
                                </div>
                            </td>

                            <td>
                                ${escapeHTML(father)}
                            </td>

                            <td>
                                ${escapeHTML(className)}
                            </td>

                            <td>
                                ${escapeHTML(phone)}
                            </td>

                            <td>
                                <span class="admin-badge ${
                                    status === "Active"
                                        ? "admin-badge-success"
                                        : "admin-badge-warning"
                                }">
                                    ${escapeHTML(status)}
                                </span>
                            </td>

                            <td>

                                <div class="admin-actions">

                                    <button
                                        type="button"
                                        class="admin-icon-btn edit"
                                        title="Edit Student"
                                        data-student-action="edit"
                                        data-student-index="${index}"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                    </button>

                                    <button
                                        type="button"
                                        class="admin-icon-btn delete"
                                        title="Delete Student"
                                        data-student-action="delete"
                                        data-student-index="${index}"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>

                                </div>

                            </td>

                        </tr>
                    `;

                }
            ).join("");

    }


    /*
       -------------------------------------------------------
       ADD STUDENT
       -------------------------------------------------------
    */

    if (addStudentBtn) {

        addStudentBtn.addEventListener(
            "click",
            function () {

                const studentModal =
                    document.getElementById(
                        "studentModal"
                    );

                if (studentModal) {

                    studentModal.classList.add(
                        "active"
                    );

                    studentModal.style.display =
                        "flex";

                    return;

                }

                openSimpleStudentForm();

            }
        );

    }


    /*
       -------------------------------------------------------
       SIMPLE STUDENT FORM
       -------------------------------------------------------
    */

    function openSimpleStudentForm() {

        const name =
            prompt("Student Name:");

        if (
            !name ||
            !name.trim()
        ) return;


        const fatherName =
            prompt("Father Name:");

        if (
            !fatherName ||
            !fatherName.trim()
        ) return;


        const className =
            prompt(
                "Class:",
                "Class 10"
            );

        if (
            !className ||
            !className.trim()
        ) return;


        const phone =
            prompt(
                "Phone:"
            );


        const gender =
            prompt(
                "Gender:",
                "Male"
            );


        const studentId =
            generateStudentId();


        const students =
            getStudents();


        students.push({

            id: studentId,

            studentId: studentId,

            name:
                name.trim(),

            studentName:
                name.trim(),

            fatherName:
                fatherName.trim(),

            className:
                className.trim(),

            studentClass:
                className.trim(),

            phone:
                phone
                    ? phone.trim()
                    : "",

            gender:
                gender
                    ? gender.trim()
                    : "",

            status:
                "Active",

            createdAt:
                new Date().toISOString()

        });


        saveStudents(students);

        renderAdminStudents();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                `Student added. ID: ${studentId}`
            );

        }

    }


    /*
       -------------------------------------------------------
       EDIT / DELETE
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-student-action]"
                );

            if (!button) return;


            const action =
                button.dataset.studentAction;


            const index =
                Number(
                    button.dataset.studentIndex
                );


            const students =
                getStudents();


            if (!students[index]) return;


            /*
               DELETE
            */

            if (action === "delete") {

                const student =
                    students[index];


                const name =
                    student.name ||
                    student.studentName ||
                    "this student";


                const confirmed =
                    confirm(
                        `Delete ${name}?`
                    );


                if (!confirmed) return;


                students.splice(
                    index,
                    1
                );


                saveStudents(students);

                renderAdminStudents();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Student deleted successfully."
                    );

                }

                return;

            }


            /*
               EDIT
            */

            if (action === "edit") {

                const student =
                    students[index];


                const currentName =
                    student.name ||
                    student.studentName ||
                    "";


                const currentFather =
                    student.fatherName ||
                    student.father ||
                    "";


                const currentClass =
                    student.className ||
                    student.studentClass ||
                    student.class ||
                    "";


                const currentPhone =
                    student.phone ||
                    student.contact ||
                    "";


                const name =
                    prompt(
                        "Student Name:",
                        currentName
                    );


                if (
                    name === null ||
                    !name.trim()
                ) return;


                const fatherName =
                    prompt(
                        "Father Name:",
                        currentFather
                    );


                if (
                    fatherName === null ||
                    !fatherName.trim()
                ) return;


                const className =
                    prompt(
                        "Class:",
                        currentClass
                    );


                if (
                    className === null ||
                    !className.trim()
                ) return;


                const phone =
                    prompt(
                        "Phone:",
                        currentPhone
                    );


                students[index] = {

                    ...student,

                    name:
                        name.trim(),

                    studentName:
                        name.trim(),

                    fatherName:
                        fatherName.trim(),

                    className:
                        className.trim(),

                    studentClass:
                        className.trim(),

                    phone:
                        phone !== null
                            ? phone.trim()
                            : currentPhone,

                    updatedAt:
                        new Date().toISOString()

                };


                saveStudents(students);

                renderAdminStudents();


                if (
                    typeof window.showAdminToast ===
                    "function"
                ) {

                    window.showAdminToast(
                        "Student updated successfully."
                    );

                }

            }

        }
    );


    /*
       -------------------------------------------------------
       STUDENT ID SYNC
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === STUDENTS_KEY ||
                event.key === ADMISSIONS_KEY
            ) {

                renderAdminStudents();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdminStudents();


    window.refreshEduSmartStudents =
        renderAdminStudents;

})();/* =========================================================
   EDUSMART — ADMISSIONS → STUDENTS CONNECTION
   Admission Form → Admin → Approve → Student Portal
========================================================= */

(function () {

    const admissionsSection =
        document.getElementById("admissionsSection");

    if (!admissionsSection) return;

    const ADMISSIONS_KEY = "edusmartAdmissions";
    const STUDENTS_KEY = "edusmartStudents";


    function getAdmissions() {

        try {
            return JSON.parse(
                localStorage.getItem(ADMISSIONS_KEY)
            ) || [];
        } catch (error) {

            console.error(
                "Unable to load admissions:",
                error
            );

            return [];
        }

    }


    function saveAdmissions(admissions) {

        localStorage.setItem(
            ADMISSIONS_KEY,
            JSON.stringify(admissions)
        );

    }


    function getStudents() {

        try {
            return JSON.parse(
                localStorage.getItem(STUDENTS_KEY)
            ) || [];
        } catch (error) {

            console.error(
                "Unable to load students:",
                error
            );

            return [];
        }

    }


    function saveStudents(students) {

        localStorage.setItem(
            STUDENTS_KEY,
            JSON.stringify(students)
        );

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function generateStudentId() {

        const students =
            getStudents();

        let number = 1001;

        const existingIds =
            students.map(
                student =>
                    String(
                        student.studentId ||
                        student.id ||
                        ""
                    )
            );


        while (
            existingIds.includes(
                `EDU-${number}`
            )
        ) {

            number++;

        }


        return `EDU-${number}`;

    }


    function renderAdmissions() {

        const tableBody =
            document.getElementById(
                "admissionsTableBody"
            );

        if (!tableBody) return;


        const admissions =
            getAdmissions();


        if (admissions.length === 0) {

            tableBody.innerHTML = "";

            updateAdmissionStats(
                admissions
            );

            return;

        }


        tableBody.innerHTML =
            admissions.map(
                (admission, index) => {

                    const name =
                        admission.studentName ||
                        admission.name ||
                        "Student";


                    const father =
                        admission.fatherName ||
                        admission.father ||
                        "—";


                    const className =
                        admission.className ||
                        admission.studentClass ||
                        admission.class ||
                        "—";


                    const phone =
                        admission.phone ||
                        admission.contact ||
                        "—";


                    const status =
                        admission.status ||
                        "Pending";


                    const applicationNumber =
                        admission.applicationNumber ||
                        admission.applicationNo ||
                        admission.id ||
                        "—";


                    let badgeClass =
                        "admin-badge-warning";


                    if (
                        status === "Approved"
                    ) {

                        badgeClass =
                            "admin-badge-success";

                    } else if (
                        status === "Rejected"
                    ) {

                        badgeClass =
                            "admin-badge-danger";

                    }


                    return `
                        <tr>

                            <td>

                                <div class="admin-student-name">
                                    ${escapeHTML(name)}
                                </div>

                                <div class="admin-student-sub">
                                    ${escapeHTML(
                                        applicationNumber
                                    )}
                                </div>

                            </td>


                            <td>
                                ${escapeHTML(father)}
                            </td>


                            <td>
                                ${escapeHTML(className)}
                            </td>


                            <td>
                                ${escapeHTML(phone)}
                            </td>


                            <td>

                                <span class="admin-badge ${badgeClass}">
                                    ${escapeHTML(status)}
                                </span>

                            </td>


                            <td>

                                <div class="admin-actions">

                                    ${
                                        status !== "Approved"
                                            ? `
                                                <button
                                                    type="button"
                                                    class="admin-icon-btn edit"
                                                    title="Approve Admission"
                                                    data-admission-action="approve"
                                                    data-admission-index="${index}"
                                                >
                                                    <i class="fa-solid fa-check"></i>
                                                </button>
                                            `
                                            : ""
                                    }


                                    ${
                                        status !== "Rejected"
                                            ? `
                                                <button
                                                    type="button"
                                                    class="admin-icon-btn delete"
                                                    title="Reject Admission"
                                                    data-admission-action="reject"
                                                    data-admission-index="${index}"
                                                >
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            `
                                            : ""
                                    }


                                    <button
                                        type="button"
                                        class="admin-icon-btn"
                                        title="Delete Admission"
                                        data-admission-action="delete"
                                        data-admission-index="${index}"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>

                                </div>

                            </td>

                        </tr>
                    `;

                }
            ).join("");


        updateAdmissionStats(
            admissions
        );

    }


    function updateAdmissionStats(
        admissions
    ) {

        const total =
            document.getElementById(
                "admissionTotal"
            );

        const pending =
            document.getElementById(
                "admissionPending"
            );

        const approved =
            document.getElementById(
                "admissionApproved"
            );

        const rejected =
            document.getElementById(
                "admissionRejected"
            );


        if (total) {
            total.textContent =
                admissions.length;
        }


        if (pending) {
            pending.textContent =
                admissions.filter(
                    item =>
                        (item.status ||
                            "Pending") ===
                        "Pending"
                ).length;
        }


        if (approved) {
            approved.textContent =
                admissions.filter(
                    item =>
                        item.status ===
                        "Approved"
                ).length;
        }


        if (rejected) {
            rejected.textContent =
                admissions.filter(
                    item =>
                        item.status ===
                        "Rejected"
                ).length;
        }

    }


    /*
       -------------------------------------------------------
       APPROVE ADMISSION
       -------------------------------------------------------
    */

    function approveAdmission(
        index
    ) {

        const admissions =
            getAdmissions();


        const admission =
            admissions[index];


        if (!admission) return;


        const name =
            admission.studentName ||
            admission.name ||
            "Student";


        const confirmed =
            confirm(
                `Approve admission for ${name}?`
            );


        if (!confirmed) return;


        const students =
            getStudents();


        /*
         * Prevent duplicate student
         */

        const existingStudent =
            students.find(
                student => {

                    const sameName =
                        String(
                            student.name ||
                            student.studentName ||
                            ""
                        )
                        .trim()
                        .toLowerCase() ===
                        String(name)
                            .trim()
                            .toLowerCase();


                    const samePhone =
                        admission.phone &&
                        student.phone &&
                        String(
                            student.phone
                        ).trim() ===
                        String(
                            admission.phone
                        ).trim();


                    return (
                        sameName &&
                        samePhone
                    );

                }
            );


        let studentId;


        if (existingStudent) {

            studentId =
                existingStudent.studentId ||
                existingStudent.id;

        } else {

            studentId =
                generateStudentId();


            students.push({

                id:
                    studentId,

                studentId:
                    studentId,

                name:
                    admission.studentName ||
                    admission.name ||
                    "",

                studentName:
                    admission.studentName ||
                    admission.name ||
                    "",

                fatherName:
                    admission.fatherName ||
                    admission.father ||
                    "",

                className:
                    admission.className ||
                    admission.studentClass ||
                    admission.class ||
                    "",

                studentClass:
                    admission.className ||
                    admission.studentClass ||
                    admission.class ||
                    "",

                gender:
                    admission.gender ||
                    "",

                dob:
                    admission.dob ||
                    admission.dateOfBirth ||
                    "",

                phone:
                    admission.phone ||
                    "",

                email:
                    admission.email ||
                    "",

                address:
                    admission.address ||
                    "",

                previousSchool:
                    admission.previousSchool ||
                    "",

                status:
                    "Active",

                applicationNumber:
                    admission.applicationNumber ||
                    admission.applicationNo ||
                    "",

                admissionId:
                    admission.id ||
                    "",

                createdAt:
                    new Date().toISOString()

            });


            saveStudents(
                students
            );

        }


        /*
         * Update admission
         */

        admissions[index] = {

            ...admission,

            status:
                "Approved",

            studentId:
                studentId,

            approvedAt:
                new Date().toISOString()

        };


        saveAdmissions(
            admissions
        );


        renderAdmissions();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                `Admission approved. Student ID: ${studentId}`
            );

        }

    }


    /*
       -------------------------------------------------------
       REJECT ADMISSION
       -------------------------------------------------------
    */

    function rejectAdmission(
        index
    ) {

        const admissions =
            getAdmissions();


        const admission =
            admissions[index];


        if (!admission) return;


        const name =
            admission.studentName ||
            admission.name ||
            "Student";


        const confirmed =
            confirm(
                `Reject admission for ${name}?`
            );


        if (!confirmed) return;


        admissions[index] = {

            ...admission,

            status:
                "Rejected",

            rejectedAt:
                new Date().toISOString()

        };


        saveAdmissions(
            admissions
        );


        renderAdmissions();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                "Admission rejected."
            );

        }

    }


    /*
       -------------------------------------------------------
       DELETE ADMISSION
       -------------------------------------------------------
    */

    function deleteAdmission(
        index
    ) {

        const admissions =
            getAdmissions();


        const admission =
            admissions[index];


        if (!admission) return;


        const confirmed =
            confirm(
                "Delete this admission permanently?"
            );


        if (!confirmed) return;


        admissions.splice(
            index,
            1
        );


        saveAdmissions(
            admissions
        );


        renderAdmissions();


        if (
            typeof window.showAdminToast ===
            "function"
        ) {

            window.showAdminToast(
                "Admission deleted successfully."
            );

        }

    }


    /*
       -------------------------------------------------------
       BUTTON ACTIONS
       -------------------------------------------------------
    */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-admission-action]"
                );


            if (!button) return;


            const action =
                button.dataset.admissionAction;


            const index =
                Number(
                    button.dataset.admissionIndex
                );


            if (
                Number.isNaN(index)
            ) return;


            if (
                action === "approve"
            ) {

                approveAdmission(
                    index
                );

            }


            if (
                action === "reject"
            ) {

                rejectAdmission(
                    index
                );

            }


            if (
                action === "delete"
            ) {

                deleteAdmission(
                    index
                );

            }

        }
    );


    /*
       -------------------------------------------------------
       STORAGE SYNC
       -------------------------------------------------------
    */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                ADMISSIONS_KEY
            ) {

                renderAdmissions();

            }

        }
    );


    /*
       -------------------------------------------------------
       INITIAL LOAD
       -------------------------------------------------------
    */

    renderAdmissions();


    window.refreshEduSmartAdmissions =
        renderAdmissions;

})();/* =========================================================
   EDUSMART — ADMIN DASHBOARD LIVE STATISTICS
   Real localStorage data → Dashboard
========================================================= */

(function () {

    const dashboardHome =
        document.getElementById("dashboardHome");

    if (!dashboardHome) return;


    const KEYS = {
        students: "edusmartStudents",
        admissions: "edusmartAdmissions",
        teachers: "edusmartTeachers",
        results: "edusmartResults",
        attendance: "edusmartAttendance",
        notices: "edusmartNotices",
        timetable: "edusmartTimetable",
        messages: "edusmartMessages"
    };


    function getData(key) {

        try {

            return JSON.parse(
                localStorage.getItem(key)
            ) || [];

        } catch (error) {

            console.error(
                "Dashboard data error:",
                key,
                error
            );

            return [];

        }

    }


    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    }


    function updateDashboardStats() {

        const students =
            getData(KEYS.students);

        const admissions =
            getData(KEYS.admissions);

        const teachers =
            getData(KEYS.teachers);

        const results =
            getData(KEYS.results);

        const attendance =
            getData(KEYS.attendance);

        const notices =
            getData(KEYS.notices);

        const messages =
            getData(KEYS.messages);


        /* ============================================
           TOP STAT CARDS
        ============================================ */

        setText(
            "totalStudents",
            students.length
        );


        setText(
            "totalAdmissions",
            admissions.filter(
                item =>
                    (item.status || "Pending")
                    === "Pending"
            ).length
        );


        setText(
            "totalTeachers",
            teachers.length
        );


        setText(
            "totalClasses",
            13
        );


        /* ============================================
           ACTIVE STUDENTS
        ============================================ */

        const activeStudents =
            students.filter(
                student =>
                    !student.status ||
                    student.status === "Active"
            ).length;


        setText(
            "activeStudents",
            activeStudents
        );


        /* ============================================
           PUBLISHED RESULTS
        ============================================ */

        const publishedResults =
            results.filter(
                result =>
                    result.published !== false
            ).length;


        setText(
            "publishedResults",
            publishedResults
        );


        /* ============================================
           ATTENDANCE TOTAL
        ============================================ */

        let attendanceTotal = 0;


        attendance.forEach(item => {

            if (
                Array.isArray(
                    item.records
                )
            ) {

                attendanceTotal +=
                    item.records.length;

            } else {

                attendanceTotal++;

            }

        });


        setText(
            "attendanceTotal",
            attendanceTotal
        );


        /* ============================================
           AVERAGE RESULT
        ============================================ */

        let percentages = [];


        results.forEach(result => {

            let percentage =
                result.percentage ??
                result.average;


            if (
                percentage === undefined &&
                Array.isArray(
                    result.subjects
                ) &&
                result.subjects.length
            ) {

                let obtained = 0;
                let total = 0;


                result.subjects.forEach(
                    subject => {

                        obtained += Number(
                            subject.obtained ??
                            subject.marks ??
                            0
                        );

                        total += Number(
                            subject.total ??
                            subject.totalMarks ??
                            100
                        );

                    }
                );


                if (total > 0) {

                    percentage =
                        (obtained / total) *
                        100;

                }

            }


            if (
                percentage !== undefined &&
                !Number.isNaN(
                    Number(percentage)
                )
            ) {

                percentages.push(
                    Number(percentage)
                );

            }

        });


        let averageResult = 0;


        if (percentages.length > 0) {

            averageResult =
                percentages.reduce(
                    (sum, value) =>
                        sum + value,
                    0
                ) /
                percentages.length;

        }


        setText(
            "averageResult",
            `${averageResult.toFixed(1)}%`
        );


        /* ============================================
           ADMISSION BADGE
        ============================================ */

        const admissionBadge =
            document.getElementById(
                "admissionBadge"
            );


        const pendingAdmissions =
            admissions.filter(
                admission =>
                    (admission.status ||
                        "Pending") ===
                    "Pending"
            ).length;


        if (admissionBadge) {

            admissionBadge.textContent =
                pendingAdmissions;

            admissionBadge.style.display =
                pendingAdmissions > 0
                    ? "inline-flex"
                    : "none";

        }


        /* ============================================
           MESSAGE BADGE
        ============================================ */

        const messageBadge =
            document.getElementById(
                "messageBadge"
            );


        const unreadMessages =
            messages.filter(
                message =>
                    message.read !== true &&
                    message.status !== "Read"
            ).length;


        if (messageBadge) {

            messageBadge.textContent =
                unreadMessages;

            messageBadge.style.display =
                unreadMessages > 0
                    ? "inline-flex"
                    : "none";

        }


        /* ============================================
           RECENT STUDENTS
        ============================================ */

        renderRecentStudents(
            students
        );

    }


    function renderRecentStudents(
        students
    ) {

        const container =
            document.getElementById(
                "recentStudents"
            );


        if (!container) return;


        if (students.length === 0) {

            container.innerHTML = `
                <div class="admin-empty-mini">
                    No students added yet.
                </div>
            `;

            return;

        }


        const recent =
            [...students]
                .reverse()
                .slice(0, 5);


        container.innerHTML =
            recent.map(
                student => {

                    const name =
                        student.name ||
                        student.studentName ||
                        "Student";


                    const className =
                        student.className ||
                        student.studentClass ||
                        student.class ||
                        "—";


                    const id =
                        student.studentId ||
                        student.id ||
                        "—";


                    const initials =
                        name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map(
                                word =>
                                    word
                                        .charAt(0)
                            )
                            .join("")
                            .toUpperCase();


                    return `
                        <div class="admin-summary-list">

                            <div class="admin-profile-avatar">
                                ${initials}
                            </div>

                            <div>
                                <strong>
                                    ${name}
                                </strong>

                                <small>
                                    ${className}
                                    • ${id}
                                </small>
                            </div>

                        </div>
                    `;

                }
            ).join("");

    }


    /*
       Live update when another tab changes data
    */

    window.addEventListener(
        "storage",
        function () {

            updateDashboardStats();

        }
    );


    /*
       Initial load
    */

    updateDashboardStats();


    /*
       Global refresh function
    */

    window.refreshEduSmartDashboard =
        updateDashboardStats;

})();
const featuresMenuButton =
    document.getElementById("featuresMenuButton");

const featuresNav =
    document.getElementById("featuresNav");

if (featuresMenuButton && featuresNav) {

    featuresMenuButton.addEventListener("click", function () {

        featuresNav.classList.toggle("show");

        const icon =
            featuresMenuButton.querySelector("i");

        if (featuresNav.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}
