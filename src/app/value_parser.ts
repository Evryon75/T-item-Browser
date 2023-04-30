//* The Mediawiki api works great, but sometimes it returns escaped html strings.
//* It is probably not the api's fault.

function main(raw: string): number {
  let raw_vec = raw.split("");
  let cursor = 0;
  let build = "";
  let result: number = 0;

  for (let i = 0; i < raw_vec.length; i++) {
    let temp_build = build + raw_vec[i];
    if (try_parse(temp_build)) result = parseFloat(build += raw_vec[i]);
    else break;
  }

  return result;
}

function try_parse(possible_number: string): boolean {
  let result = false;

  try {
    parseFloat(possible_number)
    result = true;
  } catch (e) {
    //! Remove in production
    console.log("Escaped html found")
  }

  return result
}
