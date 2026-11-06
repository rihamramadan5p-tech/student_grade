// ==========================================
// التكليف العملي: نظام إدارة وتحليل نتائج الطلاب
// باستخدام البرمجة كائنية التوجه ودوال المصفوفات
// ==========================================

class Student {

    // تطبيق مبدأ التغليف باستخدام الخصائص الخاصة
    #id;
    #name;
    #grades;
    #attendance;

    constructor(id, name, grades, attendance) {
        this.#id = id;
        this.#name = name;
        this.#grades = grades;
        this.#attendance = attendance;
    }

    // دوال Getter للوصول إلى الخصائص الخاصة
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get grades() {
        return this.#grades;
    }

    get attendance() {
        return this.#attendance;
    }

    // حساب متوسط الدرجات باستخدام reduce
    calculateAverage() {
        const total = this.#grades.reduce(
            (sum, current) => sum + current, 0
        );

        if (this.#grades.length === 0) return 0;

        return total / this.#grades.length;
    }

    // تحديد التقدير بالحروف
    getGradeLetter(average) {
        if (average >= 90) return "ممتاز";
        if (average >= 80) return "جيد جدًا";
        if (average >= 70) return "جيد";
        if (average >= 60) return "مقبول";
        if (average >= 50) return "ضعيف";

        return "راسب";
    }

    // تحديد النتيجة النهائية باستخدام AND
    getFinalResult(average) {
        const PASS_MARK = 50;
        const MIN_ATTENDANCE = 75;

        if (
            average >= PASS_MARK &&
            this.#attendance >= MIN_ATTENDANCE
        ) {
            return "ناجح";
        } else {
            return "يحتاج إلى مراجعة";
        }
    }
}

// ==========================================
// إنشاء قائمة الطلاب
// ==========================================

const studentsList = [
    new Student(1001, "أحمد محمد", [85, 90, 88], 85),
    new Student(1002, "سارة أحمد", [42, 45, 48], 80),
    new Student(1003, "محمود علي", [60, 65, 55], 70),
    new Student(1004, "فاطمة عمر", [44, 41, 46], 90)
];

// ==========================================
// عرض التقارير العامة للطلاب
// باستخدام forEach و Template Literals
// ==========================================

console.log("--- تقارير الطلاب في النظام الرئيسي ---");

studentsList.forEach(student => {

    const avg = student.calculateAverage();
    const grade = student.getGradeLetter(avg);
    const result = student.getFinalResult(avg);

    console.log(
        `اسم الطالب: ${student.name} | المتوسط: ${avg.toFixed(1)} | التقدير: ${grade} | الحالة: ${result}`
    );
});

// ==========================================
// لجنة درجات الرأفة
// باستخدام دوال المصفوفات الحديثة
// ==========================================

// أولًا: استخراج الطلاب المتعثرين باستخدام filter

const strugglingStudents = studentsList.filter(student => {

    const avg = student.calculateAverage();

    return avg >= 40 && avg <= 49;
});

// ثانيًا: إضافة 5 درجات رأفة باستخدام map

const upgradedAverages = strugglingStudents.map(student => {

    const oldAvg = student.calculateAverage();

    return oldAvg + 5;
});

// ثالثًا: حساب مجموع المتوسطات بعد إضافة درجات الرأفة باستخدام reduce

const totalUpgraded = upgradedAverages.reduce(
    (sum, grade) => sum + grade, 0
);

// رابعًا: حساب متوسط درجات الطلاب بعد الرأفة
// مع التأكد من عدم القسمة على صفر

let averageOfGrace = 0;

if (strugglingStudents.length > 0) {
    averageOfGrace = totalUpgraded / strugglingStudents.length;
}

// ==========================================
// عرض تقارير لجنة درجات الرأفة
// ==========================================

console.log("\n--- قائمة الطلاب المتعثرين ---");

strugglingStudents.forEach(student => {

    console.log(
        `- الطالب: ${student.name} (المتوسط الأصلي: ${student.calculateAverage().toFixed(1)})`
    );

});

console.log("\n--- المتوسطات بعد إضافة 5 درجات رأفة ---");

upgradedAverages.forEach((newAvg, index) => {

    console.log(
        `- ${strugglingStudents[index].name}: المتوسط الجديد = ${newAvg.toFixed(1)}`
    );

});

console.log(
    `\nالمتوسط العام للطلاب المتعثرين بعد درجات الرأفة: ${averageOfGrace.toFixed(1)}`
);