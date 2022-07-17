import Page from './page'
import RedPacket from './redpacket'
import Img from './img'

class Main extends Page
{
    constructor(app, name) {
        super(app, name);
    }

    create(options = {}) {
        options = Object.assign({
            quitEvent: (event) => {
                this.app.quit()
            },
            show: true,
            frame: false,
            width: 400, 
            height: 600, 
            minWidth: 350
        }, options);
        return super.create(options);
    }

    get events() {
        return {
            close() {
                this.app.quit()
            },
            opacity(event, args) {
                if(!this.win) return;
                this.win.setOpacity(args.enable ? args.value / 100 : 1)
            },
            min() {
                if(!this.win) return;
                this.win.hide()
            },
            top(event, args) {
                if(!this.win) return;
                this.win.setAlwaysOnTop(args, 'floating')
            },
            resize(event, args) {
                if(!this.win) return;
                let size = this.win.getSize();
                this.win.setSize(args.width || size[0], args.height || size[1]);
            },
            getPosition(event, args, callback) {
                if(!this.win) return;
                let [x, y] = this.win.getPosition();
                callback({ x, y });
            },
            openRedpacket(event, args) {
                if (args == 'send' || args.id == 'send') {
                    if(!this.redpacket) 
                        this.redpacket = new RedPacket(this.app, 'redpacket').create({
                            quitEvent: () => {
                                this.redpacket = null
                            }
                        }, args);
                    else 
                        this.redpacket.show();
                }
                else new RedPacket(this.app, 'redpacket').create({}, args);
            },
            openImage(event, args) {
                if(!this.img) 
                {
                    this.img = new Img(this.app, 'img');
                    this.img.create({
                        quitEvent: () => {
                            this.img = null
                        },
                        parent: this.win
                    }, args);
                }
                else 
                    this.img.setImage(args);
            }
        }
    }
}

export default Main;