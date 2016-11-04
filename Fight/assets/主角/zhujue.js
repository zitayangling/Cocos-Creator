cc.Class({
    extends: cc.Component,

    properties: {
        shengzi:{
            default: null,
            type: cc.Node,
        },
        // 最大移动速度
        maxMoveSpeed: 200,
        // 加速度
        accel: 150,
    },
    // use this for initialization
    
    keyBoard: function ()
    {
        var self = this;
        if('keyboard' in cc.sys.capabilities)
        {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:function(keyCode,event){
                    switch(keyCode)
                    {
                        case cc.KEY.a:
                            if(!self.node.isLeft)
                            {
                                self.node.scaleX = 1;
                                self.node.isLeft = 1;
                            }
                            self.walkDown.playAdditive("walkDown");
                            self.accLeft = true;
                            self.accRight = false;
                            break;
                        case cc.KEY.d:
                            if(self.node.isLeft)
                            {
                               self.node.scaleX = -1;
                               self.node.isLeft = 0;
                            }
                            self.walkDown.playAdditive("walkDown");
                            self.accLeft = false;
                            self.accRight = true;
                            break;
                    }
                },
                onKeyReleased:function(keyCode,event){
                    switch(keyCode)
                    {
                        case cc.KEY.a:
                            self.accLeft = false;
                            break;
                        case cc.KEY.d:
                            self.accRight = false;
                            
                            break;
                    }
                }
            }, self.node);
        }
    },
    
    
    onLoad: function () {
        this.walkDown = this.node.getComponent(cc.Animation);
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        
        // 主角当前水平方向速度
        this.xSpeed = 0;
        this.node.isLeft = 1;
        this.keyBoard();
        
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt * 2.5;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt * 2.5;
        }
        else{
            // if(this.xSpeed < 0)
            // {
            //     this.xSpeed += this.accel * dt * 2;
            // }
            // else if(this.xSpeed > 0)
            // {
            //      this.xSpeed -= this.accel * dt * 2;
            // }
            this.xSpeed = 0;
                this.walkDown.stop("walkDown");
                // this.node.image = "/主角/身子/手枪/Image 523 at frame 10.png";
                // this.node.setTexture(cc.url.raw('/主角/身子/手枪/Image 523 at frame 10.png'));
            
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
            log(this.xSpeed);
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
    },
});
