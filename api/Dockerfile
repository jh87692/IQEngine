FROM docker.io/python:3.10
LABEL org.opencontainers.image.description="IQEngine is a container image that provides a concise and efficient visualization and exploration tool for RF data in the SIGMF format."
LABEL org.opencontainers.image.licenses=MIT
COPY src /app 
WORKDIR /app
RUN pip install --no-cache-dir -r ./requirements.txt
EXPOSE 3000
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "5000", "main:app"]
