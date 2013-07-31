class UserCell < Cell::Rails

  def display
    @users = User.all

    render  # renders display.html.haml
  end

end
