/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonRepository = require('./jsonRepository');

module.exports = (req, res, next) =>
{
    if (req.url === '/super-admin-login' && req.method === 'POST')
    {
        const refreshToken = {
            data: {
                accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKMXBPSGFwVmJpZTVvbW9ya3pQbE9FRUdXMGtHY2YxLUlpTGk1VFByUFZzIn0.eyJleHAiOjE2OTM0MDYzODEsImlhdCI6MTY5MzQwNjA4MSwianRpIjoiODhmZjQxOWEtYjVkYy00OTQ0LThmNDEtMjZmMGFkZDk0ZDIxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kaWdpY2hhbmdlcyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIzNDFmMWQ3ZC0xOWNmLTQ3MDUtYjY3Ni0xNGU3ZDZmMzU0OGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJleHBlcmllbmNlIiwic2Vzc2lvbl9zdGF0ZSI6IjgzMGQxN2E3LThjZTEtNDQ4NS04ZTgwLTJmZWE5MjIzNWMyZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZGlnaWNoYW5nZXMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXhwZXJpZW5jZSI6eyJyb2xlcyI6WyJBZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBwaG9uZSIsInNpZCI6IjgzMGQxN2E3LThjZTEtNDQ4NS04ZTgwLTJmZWE5MjIzNWMyZSIsImNvdW50cnkiOiJBUiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJiaXJ0aGRhdGUiOiIxOTAwLTExLTI1IiwiZ2VuZGVyIjoiTSIsInBob25lIjoiMjIzNDQ1Njk5OCIsIm5hbWUiOiJhZG1pbiBub2RlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5Abm9kZS5jb20iLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJmYW1pbHlfbmFtZSI6Im5vZGUiLCJlbWFpbCI6ImFkbWluQG5vZGUuY29tIn0.SHMcm7Ov_uEupFdMNu81QPQBMvflM0ki6WVQifIR4AppgwNZsmYh28d6GpRcAEk1rGBcTJRBj2J27DteOGayYxGSPNjwfV1iVF2jK408DbVVbZe9MGDHnXjvSstWcFRoDMgGbQdajesgao9rnSuW9-RTZBiepXidjMxY3UQDc_VwhvigC8YCZqvSusfgsVtM6nKmzHGBdta6DT-60pBE3UQkHoNPfKbPU7V4le7Qd4I_Kdc_u3_IYPSjgduuRDIjaWplMgqvySXyHWJw16Aa69taZFL-nh_9zcP5NKqFTGDi5Xi0fSldySL4jlnvTjWwR2B2CAHzsiD4gT1EdNTPvA",
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZDdmMjc0OC0xZmQ3LTRhM2YtYTk1ZS1mMWRhMWI4ZGRlMGMifQ.eyJleHAiOjE2OTM0MDc4ODEsImlhdCI6MTY5MzQwNjA4MSwianRpIjoiZWEzYmI1MjgtNDc3NC00ZGJjLThhM2QtZmNhOWQwYjJlYWMxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kaWdpY2hhbmdlcyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvZGlnaWNoYW5nZXMiLCJzdWIiOiIzNDFmMWQ3ZC0xOWNmLTQ3MDUtYjY3Ni0xNGU3ZDZmMzU0OGMiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiZXhwZXJpZW5jZSIsInNlc3Npb25fc3RhdGUiOiI4MzBkMTdhNy04Y2UxLTQ0ODUtOGU4MC0yZmVhOTIyMzVjMmUiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIHBob25lIiwic2lkIjoiODMwZDE3YTctOGNlMS00NDg1LThlODAtMmZlYTkyMjM1YzJlIn0.Vg85zAas04aNv44RTIkYvcKr5fA8uJniJN1SSTbrEzc",
                expiresIn: 300,
                refreshExpiresIn: 1800
            }
        };

        jsonRepository.saveRefreshToken(refreshToken);

        req.method = 'GET';
    }
    next();
};
