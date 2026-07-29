import os
from pathlib import Path
from dotenv import load_dotenv

# backend 폴더의 절대 경로 계산 (.env 위치 지정)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    def validate(self):
        if not self.SUPABASE_URL or not self.SUPABASE_KEY:
            raise ValueError(f"⚠️ .env 파일({ENV_PATH})에 SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 설정해주세요!")

settings = Settings()