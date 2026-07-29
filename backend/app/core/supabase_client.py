from supabase import create_client, Client
from app.core.config import settings

settings.validate()

# Supabase 클라이언트 생성
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)