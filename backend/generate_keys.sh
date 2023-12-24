if [[ -f keys.txt ]]; then
  echo "Keys file already exists. Using existing keys."
else
  # Generate keys if keys file doesn't exist:
  openssl genrsa -out private.key 4096  # Generate a 4096-bit private key
  openssl rsa -in private.key -pubout -out public.key  # Extract the public key

  # Replace newlines with literal \n:
  sed ':a;N;$!ba;s/\n/\\n/g' private.key > private.key.oneline
  sed ':a;N;$!ba;s/\n/\\n/g' public.key > public.key.oneline

  # Combine keys into a single file:
  cat private.key.oneline public.key.oneline > keys.txt

  rm private.key.oneline public.key.oneline
fi

if [[ -f .env ]]; then
  echo "Appending keys to existing .env file..."
  echo "" >> .env
  echo "PRIVATE_KEY=\"$(cat keys.txt | head -n $(($(wc -l < keys.txt)/2)))\"" >> .env
  echo "PUBLIC_KEY=\"$(cat keys.txt | tail -n $(($(wc -l < keys.txt)/2)))\"" >> .env
else
  echo "Creating new .env file..."
  echo "PRIVATE_KEY=\"$(cat keys.txt | head -n $(($(wc -l < keys.txt)/2)))\"" > .env
  echo "PUBLIC_KEY=\"$(cat keys.txt | tail -n $(($(wc -l < keys.txt)/2)))\"" >> .env
fi