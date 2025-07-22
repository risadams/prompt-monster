const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const schema = require('./template.schema.json');

const templatesDir = path.join(__dirname, 'templates');

describe('Template files validation', () => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.json'));

  templateFiles.forEach(file => {
    const filePath = path.join(templatesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let templates;
    try {
      templates = JSON.parse(fileContent);
    } catch (e) {
      throw new Error(`Invalid JSON in ${file}: ${e.message}`);
    }
    if (!Array.isArray(templates)) {
      templates = [templates];
    }
    templates.forEach((template, idx) => {
      it(`validates ${file} [${idx}] against the schema`, () => {
        const valid = validate(template);
        if (!valid) {
          console.error(`${file} [${idx}]`, validate.errors);
        }
        expect(valid).toBe(true);
      });
    });
  });
});
