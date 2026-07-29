import os
from pathlib import Path
from dotenv import load_dotenv

# backend 폴더의 절대 경로 계산 (.env 위치 지정)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

class Settings:
    # .env에 적힌 변수명(NEXT_PUBLIC_...) 그대로 불러오기
    SUPABASE_URL: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")

    def validate(self):
        if not self.SUPABASE_URL or not self.SUPABASE_KEY:
            raise ValueError(f"⚠️ .env 파일({ENV_PATH})에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요!")

settings = Settings()