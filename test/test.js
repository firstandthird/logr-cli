//WIP
  describe('cli', () => {
    it('should default color error, warn, notice', () => {
      const log = new Logr({
        logger,
        type: 'cli'
      });
      log(['error', 'warn', 'notice'], 'message');
      expect(lastMessage).to.equal('  message\u0007 \u001b[90m(\u001b[39m\u001b[31merror\u001b[39m\u001b[90m,\u001b[39m\u001b[33mwarn\u001b[39m\u001b[90m,\u001b[39m\u001b[34mnotice\u001b[39m\u001b[90m)\u001b[39m');
    });
    it('should default color error, warning, notice', () => {
      const log = new Logr({
        logger,
        type: 'cli'
      });
      log(['error', 'warning', 'notice'], 'message');
      expect(lastMessage).to.equal('  message\u0007 \u001b[90m(\u001b[39m\u001b[31merror\u001b[39m\u001b[90m,\u001b[39m\u001b[33mwarning\u001b[39m\u001b[90m,\u001b[39m\u001b[34mnotice\u001b[39m\u001b[90m)\u001b[39m');
    });
    it('should ding on "error" tag by default', () => {
      const log = new Logr({
        logger,
        type: 'cli',
      });
      log(['error', 'tag2', 'ding'], 'message with a ding added');
      expect(lastMessage).to.contain('\u0007');
    });
    it('should be able to accept an error instance', () => {
      const log = new Logr({
        logger,
        type: 'cli'
      });
      log(new Error('my error'));
      expect(lastMessage).to.include('(\u001b[39m\u001b[31merror\u001b[39m\u001b[90m)\u001b[39m');
      expect(lastMessage).to.include('my error');
      expect(lastMessage).to.include('Error: my error');
      expect(lastMessage).to.include('logr.test.js');
    });
    it('should print correctly (indented, no timestamp, tags last)', () => {
      const log = new Logr({
        logger,
        type: 'cli',
        renderOptions: {
          cli: {
            colors: {
              tag1: 'red'
            }
          }
        }
      });
      log(['tag1'], 'message');
      expect(lastMessage).to.equal('  message \u001b[90m(\u001b[39m\u001b[31mtag1\u001b[39m\u001b[90m)\u001b[39m');
    });
    it('should pretty-print objects correctly (indented, no timestamp, tags last)', () => {
      const log = new Logr({
        logger,
        type: 'cli',
        renderOptions: {
          cli: {
            colors: {
              tag1: 'red'
            }
          }
        }
      });
      log(['tag1'], { message: 123 });
      expect(lastMessage).to.equal('  {\n  "message": 123\n} \u001b[90m(\u001b[39m\u001b[31mtag1\u001b[39m\u001b[90m)\u001b[39m');
    });
    it('should take in an optional color to color the whole line)', () => {
      const log = new Logr({
        logger,
        type: 'cli',
        renderOptions: {
          cli: {
            lineColor: 'bgGreen',
            colors: {
              tag1: 'red'
            }
          }
        }
      });
      log(['tag1'], 'message');
      expect(lastMessage).to.equal('  \u001b[42mmessage\u001b[49m \u001b[90m(\u001b[39m\u001b[31mtag1\u001b[39m\u001b[90m)\u001b[39m');
    });

    it('should take in an optional prefix and color the prefix)', () => {
      const log = new Logr({
        logger,
        type: 'cli',
        renderOptions: {
          cli: {
            prefix: 'app | ',
            prefixColor: 'bgGreen',
            colors: {
              tag1: 'red'
            }
          }
        }
      });
      log(['tag1'], 'message');
      expect(lastMessage).to.equal('\u001b[42mapp | \u001b[49mmessage \u001b[90m(\u001b[39m\u001b[31mtag1\u001b[39m\u001b[90m)\u001b[39m');
    });
  });
