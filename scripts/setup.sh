#!/bin/bash

# פינטו הסעים - סקריפט התקנה מהיר
# הפעל עם: chmod +x scripts/setup.sh && ./scripts/setup.sh

echo "🚍 פינטו הסעים - התקנה מהירה"
echo "=================================="

# בדיקת Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js לא מותקן. אנא התקן Node.js גרסה 18 או חדשה יותר"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 18 ]; then
    echo "❌ נדרשת גרסת Node.js 18 או חדשה יותר"
    exit 1
fi

echo "✅ Node.js גרסה $(node -v) נמצאה"

# בדיקת PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL לא נמצא. אנא ודא שהוא מותקן ופועל"
    echo "   Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "   macOS: brew install postgresql"
    echo "   Windows: https://www.postgresql.org/download/windows/"
fi

# יצירת פרויקט
echo "📦 יוצר פרויקט Next.js..."
npx create-next-app@latest pinto-transport --typescript --tailwind --eslint --app --no-git

cd pinto-transport

# התקנת חבילות
echo "📦 מתקין חבילות נדרשות..."
npm install @prisma/client prisma next-auth bcryptjs @types/bcryptjs lucide-react tsx

# יצירת מבנה תיקיות
echo "📁 יוצר מבנה תיקיות..."
mkdir -p {lib,components/{admin,driver},types,prisma,scripts}

# יצירת קובץ .env
echo "⚙️  יוצר קובץ סביבה..."
cat > .env << EOF
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pinto_transport"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
EOF

echo "✅ קובץ .env נוצר. אנא עדכן את DATABASE_URL עם פרטי בסיס הנתונים שלך"

# הודעת סיום
echo ""
echo "🎉 ההתקנה הושלמה בהצלחה!"
echo ""
echo "📋 השלבים הבאים:"
echo "1. cd pinto-transport"
echo "2. ערוך את קובץ .env עם פרטי בסיס הנתונים"
echo "3. npx prisma db push"
echo "4. npm run db:seed"
echo "5. npm run dev"
echo ""
echo "🌐 לאחר מכן גש לכתובת: http://localhost:3000"
echo ""
echo "👤 משתמשים לדוגמה:"
echo "   מנהל: admin@pinto.com / admin123"
echo "   נהג: driver@pinto.com / driver123"
echo ""
echo "📚 לתיעוד מלא: עיין ב-README.md"