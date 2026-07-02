import { readMavenManifest } from "../src/engine/technology-detector/helpers/manifestReaders/mavenReader.js";

const fakePom = `
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
`;

async function test() {
  const result = await readMavenManifest({ content: fakePom });
  console.log("Parsed dependencies:", result.dependencies);
}
test();
