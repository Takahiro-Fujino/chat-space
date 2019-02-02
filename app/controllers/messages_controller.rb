class MessagesController < ApplicationController

  def index
  end

  def create
    @message = Message.new
  end


# ここから下は未実装
  #   def new
  #   @message = message.new
  # end

  # def create
  #   Review.create(create_params)
  #   render action: :new #表示したいビューを表示
  # end

  # private
  # def create_params
  #   params.require(:review).permit(:text)
  # end

end
